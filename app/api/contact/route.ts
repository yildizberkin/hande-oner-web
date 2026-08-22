import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  sessionType?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
  language?: "tr" | "en";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SESSION_TYPES = new Set(["online", "face-to-face"]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function verifyTurnstile(token: string, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Local development can run without Turnstile keys.
  if (!secret && process.env.NODE_ENV !== "production") {
    return true;
  }

  if (!secret || !token) {
    return false;
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success?: boolean;
    hostname?: string;
  };

  return result.success === true;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;

    // Honeypot: normal users never fill this field.
    if (clean(payload.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(payload.name, 120);
    const email = clean(payload.email, 254).toLowerCase();
    const phone = clean(payload.phone, 40);
    const sessionType = clean(payload.sessionType, 30);
    const message = clean(payload.message, 1500);
    const language = payload.language === "en" ? "en" : "tr";

    if (
      name.length < 2 ||
      !EMAIL_RE.test(email) ||
      phone.length < 7 ||
      !ALLOWED_SESSION_TYPES.has(sessionType) ||
      message.length < 2
    ) {
      return NextResponse.json(
        {
          message:
            language === "tr"
              ? "Lütfen zorunlu alanları geçerli bilgilerle doldurun."
              : "Please complete all required fields with valid information.",
        },
        { status: 400 },
      );
    }

    const remoteIp =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    const turnstileOk = await verifyTurnstile(
      clean(payload.turnstileToken, 2048),
      remoteIp,
    );

    if (!turnstileOk) {
      return NextResponse.json(
        {
          message:
            language === "tr"
              ? "Güvenlik doğrulaması başarısız oldu. Lütfen tekrar deneyin."
              : "Security verification failed. Please try again.",
        },
        { status: 403 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "pskhandeoner@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !fromEmail) {
      console.error("Contact form email configuration is missing.");

      return NextResponse.json(
        {
          message:
            language === "tr"
              ? "İletişim servisi şu anda yapılandırılmamış. Lütfen e-posta ile iletişime geçin."
              : "The contact service is not configured yet. Please get in touch by email.",
        },
        { status: 503 },
      );
    }

    const sessionLabels: Record<string, string> = {
      online: "Online",
      "face-to-face": language === "tr" ? "Yüz Yüze" : "Face-to-Face",
    };

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#43302e">
        <h2>Yeni seans / ön görüşme talebi</h2>
        <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Görüşme tercihi:</strong> ${escapeHtml(sessionLabels[sessionType] ?? sessionType)}</p>
        <p><strong>Site dili:</strong> ${language.toUpperCase()}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${escapeHtml(message || "-").replace(/\n/g, "<br />")}</p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Yeni seans / ön görüşme talebi — ${name}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend error:", errorText);

      return NextResponse.json(
        {
          message:
            language === "tr"
              ? "Mesaj şu anda gönderilemedi. Lütfen biraz sonra tekrar deneyin."
              : "Your message could not be sent right now. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}
