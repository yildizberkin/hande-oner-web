import { getDb } from "@/lib/db";
import type { BlogPost, Category, Language, PostInput } from "@/lib/cms-types";

const POST_SELECT = `
  SELECT
    p.id, p.slug, p.language, p.title, p.excerpt, p.content, p.content_json,
    p.references_json, p.revision,
    p.category_id, c.name AS category_name, c.slug AS category_slug,
    p.featured_image, p.image_alt, p.seo_title, p.seo_description,
    p.status, p.published_at, p.created_at, p.updated_at
  FROM posts p
  LEFT JOIN categories c ON c.id = p.category_id
`;

export async function listCategories(language?: Language) {
  const db = getDb();
  const query = language
    ? db.prepare("SELECT id, slug, language, name FROM categories WHERE language = ? ORDER BY name ASC").bind(language)
    : db.prepare("SELECT id, slug, language, name FROM categories ORDER BY language, name ASC");
  const result = await query.all<Category>();
  return result.results;
}

export async function listPublishedPosts({ language, search = "", category = "", page = 1, pageSize = 9 }: {
  language: Language; search?: string; category?: string; page?: number; pageSize?: number;
}) {
  const db = getDb();
  const clauses = ["p.language = ?", "p.status = 'published'"];
  const values: unknown[] = [language];

  if (search) {
    clauses.push("(p.title LIKE ? OR p.excerpt LIKE ?)");
    values.push(`%${search}%`, `%${search}%`);
  }
  if (category) {
    clauses.push("c.slug = ?");
    values.push(category);
  }

  const where = clauses.join(" AND ");
  const offset = Math.max(page - 1, 0) * pageSize;
  const count = await db.prepare(
    `SELECT COUNT(*) AS total FROM posts p LEFT JOIN categories c ON c.id = p.category_id WHERE ${where}`
  ).bind(...values).first<{ total: number }>();

  const rows = await db.prepare(
    `${POST_SELECT} WHERE ${where}
     ORDER BY COALESCE(p.published_at, p.created_at) DESC
     LIMIT ? OFFSET ?`
  ).bind(...values, pageSize, offset).all<BlogPost>();

  return { posts: rows.results, total: Number(count?.total ?? 0), page, pageSize };
}

export async function getPublishedPost(language: Language, slug: string) {
  return getDb().prepare(
    `${POST_SELECT} WHERE p.language = ? AND p.slug = ? AND p.status = 'published' LIMIT 1`
  ).bind(language, slug).first<BlogPost>();
}

export async function listAdminPosts({ language, status, search, page = 1, pageSize = 50 }: {
  language?: Language; status?: "draft" | "published"; search?: string; page?: number; pageSize?: number;
}) {
  const db = getDb();
  const clauses: string[] = [];
  const values: unknown[] = [];

  if (language) { clauses.push("p.language = ?"); values.push(language); }
  if (status) { clauses.push("p.status = ?"); values.push(status); }
  if (search) {
    clauses.push("(p.title LIKE ? OR p.slug LIKE ? OR p.excerpt LIKE ?)");
    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const offset = Math.max(page - 1, 0) * pageSize;
  const count = await db.prepare(`SELECT COUNT(*) AS total FROM posts p ${where}`)
    .bind(...values).first<{ total: number }>();
  const rows = await db.prepare(
    `${POST_SELECT} ${where} ORDER BY p.updated_at DESC LIMIT ? OFFSET ?`
  ).bind(...values, pageSize, offset).all<BlogPost>();

  return { posts: rows.results, total: Number(count?.total ?? 0), page, pageSize };
}

export async function getAdminPost(id: number) {
  return getDb().prepare(`${POST_SELECT} WHERE p.id = ? LIMIT 1`).bind(id).first<BlogPost>();
}

function snapshot(post: BlogPost) {
  return JSON.stringify({
    slug: post.slug,
    language: post.language,
    title: post.title,
    excerpt: post.excerpt,
    contentJson: post.content_json,
    referencesJson: post.references_json,
    categoryId: post.category_id,
    featuredImage: post.featured_image,
    imageAlt: post.image_alt,
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
    status: post.status,
    publishedAt: post.published_at,
  });
}

export async function createPost(input: PostInput) {
  const db = getDb();
  const publishedAt = input.status === "published" ? new Date().toISOString() : null;
  const result = await db.prepare(
    `INSERT INTO posts (
      slug, language, title, excerpt, content, content_json, references_json,
      category_id, featured_image, image_alt, seo_title, seo_description,
      status, published_at, revision, updated_at
    ) VALUES (?, ?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    RETURNING id`
  ).bind(
    input.slug, input.language, input.title, input.excerpt,
    input.contentJson, input.referencesJson, input.categoryId,
    input.featuredImage || null, input.imageAlt || null,
    input.seoTitle || null, input.seoDescription || null,
    input.status, publishedAt,
  ).first<{ id: number }>();
  return result?.id;
}

export async function updatePost(id: number, input: PostInput) {
  const db = getDb();
  const existing = await getAdminPost(id);
  if (!existing) return false;

  await db.prepare(
    `INSERT INTO post_revisions (post_id, revision, snapshot_json) VALUES (?, ?, ?)`
  ).bind(id, existing.revision, snapshot(existing)).run();

  const publishedAt = input.status === "published"
    ? existing.published_at ?? new Date().toISOString()
    : null;

  await db.prepare(
    `UPDATE posts SET
      slug = ?, language = ?, title = ?, excerpt = ?, content_json = ?,
      references_json = ?, category_id = ?, featured_image = ?, image_alt = ?,
      seo_title = ?, seo_description = ?, status = ?, published_at = ?,
      revision = revision + 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).bind(
    input.slug, input.language, input.title, input.excerpt,
    input.contentJson, input.referencesJson, input.categoryId,
    input.featuredImage || null, input.imageAlt || null,
    input.seoTitle || null, input.seoDescription || null,
    input.status, publishedAt, id,
  ).run();

  return true;
}

export async function deletePost(id: number) {
  await getDb().prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}

export async function listPostRevisions(id: number) {
  const result = await getDb().prepare(
    `SELECT id, post_id, revision, snapshot_json, created_at
     FROM post_revisions WHERE post_id = ? ORDER BY revision DESC LIMIT 20`
  ).bind(id).all<{ id: number; post_id: number; revision: number; snapshot_json: string; created_at: string }>();
  return result.results;
}

export async function restorePostRevision(postId: number, revisionId: number) {
  const db = getDb();
  const current = await getAdminPost(postId);
  if (!current) return false;

  const revision = await db.prepare(
    `SELECT snapshot_json FROM post_revisions WHERE id = ? AND post_id = ? LIMIT 1`
  ).bind(revisionId, postId).first<{ snapshot_json: string }>();
  if (!revision) return false;

  await db.prepare(
    `INSERT INTO post_revisions (post_id, revision, snapshot_json) VALUES (?, ?, ?)`
  ).bind(postId, current.revision, snapshot(current)).run();

  const data = JSON.parse(revision.snapshot_json) as Record<string, unknown>;

  await db.prepare(
    `UPDATE posts SET
      slug = ?, language = ?, title = ?, excerpt = ?, content_json = ?,
      references_json = ?, category_id = ?, featured_image = ?, image_alt = ?,
      seo_title = ?, seo_description = ?, status = ?, published_at = ?,
      revision = revision + 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).bind(
    data.slug, data.language, data.title, data.excerpt,
    data.contentJson, data.referencesJson ?? "[]", data.categoryId,
    data.featuredImage, data.imageAlt, data.seoTitle, data.seoDescription,
    data.status, data.publishedAt, postId,
  ).run();

  return true;
}
