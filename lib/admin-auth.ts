import { cookies } from "next/headers";

const COOKIE_NAME = "hande_admin_session";
const SESSION_HOURS = 12;

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string) {
  const secret = process.env.CMS_SESSION_SECRET;

  if (!secret) {
    throw new Error("CMS_SESSION_SECRET is not configured.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  return toHex(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)),
  );
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

export async function createAdminSession() {
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = String(expiresAt);
  const signature = await sign(payload);

  const store = await cookies();
  store.set(COOKIE_NAME, `${payload}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;

  if (!value) return false;

  const [expiresAtRaw, signature] = value.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const expected = await sign(expiresAtRaw);
  return constantTimeEqual(signature, expected);
}

export async function validateAdminPassword(password: string) {
  const configured = process.env.CMS_ADMIN_PASSWORD;
  if (!configured) return false;

  return constantTimeEqual(password, configured);
}
