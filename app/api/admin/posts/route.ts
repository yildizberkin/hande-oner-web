import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createPost, listAdminPosts } from "@/lib/blog-db";
import type { Language, PostInput, PostStatus } from "@/lib/cms-types";
import { slugify } from "@/lib/slugify";

function validJsonString(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  try { JSON.parse(value); return value; } catch { return fallback; }
}

function normalizeInput(body: Record<string, unknown>): PostInput | null {
  const language: Language = body.language === "en" ? "en" : "tr";
  const status: PostStatus = body.status === "published" ? "published" : "draft";
  const title = String(body.title ?? "").trim();
  const slug = slugify(String(body.slug || title));
  const excerpt = String(body.excerpt ?? "").trim().slice(0, 500);
  const contentJson = validJsonString(body.contentJson, '{"type":"doc","content":[{"type":"paragraph"}]}');
  const referencesJson = validJsonString(body.referencesJson, "[]");
  const categoryId = body.categoryId ? Number(body.categoryId) : null;

  if (!title || !slug) return null;

  return {
    language, status, title: title.slice(0, 180), slug, excerpt,
    contentJson, referencesJson,
    categoryId: Number.isFinite(categoryId) ? categoryId : null,
    featuredImage: String(body.featuredImage ?? "").trim().slice(0, 1000),
    imageAlt: String(body.imageAlt ?? "").trim().slice(0, 240),
    seoTitle: String(body.seoTitle ?? "").trim().slice(0, 180),
    seoDescription: String(body.seoDescription ?? "").trim().slice(0, 320),
  };
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const language = url.searchParams.get("language") === "en" ? "en"
    : url.searchParams.get("language") === "tr" ? "tr" : undefined;
  const status = url.searchParams.get("status") === "published" ? "published"
    : url.searchParams.get("status") === "draft" ? "draft" : undefined;

  return NextResponse.json(await listAdminPosts({
    language,
    status,
    search: url.searchParams.get("search") ?? "",
    page: Number(url.searchParams.get("page") ?? 1),
  }));
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const input = normalizeInput((await request.json()) as Record<string, unknown>);
  if (!input) {
    return NextResponse.json({ message: "Başlık zorunludur." }, { status: 400 });
  }

  try {
    const id = await createPost(input);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("UNIQUE")) {
      return NextResponse.json(
        { message: "Bu dil için aynı URL adresi zaten kullanılıyor." },
        { status: 409 },
      );
    }
    throw error;
  }
}
