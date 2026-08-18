"use client";

import { useEffect, useMemo, useState } from "react";
import type { BlogPost, Category, Language, PostStatus, ReferenceItem } from "@/lib/cms-types";
import { slugify } from "@/lib/slugify";
import RichEditor from "./components/RichEditor";

type EditorState = {
  id?: number;
  title: string;
  slug: string;
  language: Language;
  excerpt: string;
  contentJson: string;
  contentHtml: string;
  categoryId: string;
  featuredImage: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  status: PostStatus;
  references: ReferenceItem[];
  revision: number;
};

type Revision = { id: number; revision: number; created_at: string };

const EMPTY_JSON = '{"type":"doc","content":[{"type":"paragraph"}]}';

const freshPost: EditorState = {
  title: "",
  slug: "",
  language: "tr",
  excerpt: "",
  contentJson: EMPTY_JSON,
  contentHtml: "",
  categoryId: "",
  featuredImage: "",
  imageAlt: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  references: [],
  revision: 1,
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editor, setEditor] = useState<EditorState>(freshPost);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "references" | "seo" | "history">("write");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [slugTouched, setSlugTouched] = useState(false);

  const availableCategories = useMemo(
    () => categories.filter((category) => category.language === editor.language),
    [categories, editor.language],
  );

  async function loadList() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (languageFilter) params.set("language", languageFilter);
    if (statusFilter) params.set("status", statusFilter);

    const [postsResponse, categoriesResponse] = await Promise.all([
      fetch(`/api/admin/posts?${params.toString()}`, { cache: "no-store" }),
      fetch("/api/admin/categories", { cache: "no-store" }),
    ]);

    if (postsResponse.status === 401 || categoriesResponse.status === 401) {
      window.location.href = "/admin/login";
      return;
    }

    const postsData = await postsResponse.json() as { posts?: BlogPost[] };
    const categoriesData = await categoriesResponse.json() as { categories?: Category[] };
    setPosts(postsData.posts ?? []);
    setCategories(categoriesData.categories ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        document.getElementById("cms-main-save")?.click();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const listener = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [dirty]);

  function update<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setDirty(true);
    setEditor((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !slugTouched) next.slug = slugify(String(value));
      if (key === "language") next.categoryId = "";
      return next;
    });
  }

  function startNew() {
    if (dirty && !window.confirm("Kaydedilmemiş değişiklikler var. Yeni yazıya geçilsin mi?")) return;
    setEditor(freshPost);
    setRevisions([]);
    setSlugTouched(false);
    setDirty(false);
    setMessage("");
    setActiveTab("write");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function openPost(id: number) {
    if (dirty && editor.id !== id && !window.confirm("Kaydedilmemiş değişiklikler var. Diğer yazıya geçilsin mi?")) return;

    const response = await fetch(`/api/admin/posts/${id}`, { cache: "no-store" });
    if (!response.ok) return;
    const { post } = await response.json() as { post: BlogPost };

    let refs: ReferenceItem[] = [];
    try { refs = JSON.parse(post.references_json || "[]"); } catch {}

    setEditor({
      id: post.id,
      title: post.title,
      slug: post.slug,
      language: post.language,
      excerpt: post.excerpt,
      contentJson: post.content_json || EMPTY_JSON,
      contentHtml: "",
      categoryId: post.category_id ? String(post.category_id) : "",
      featuredImage: post.featured_image ?? "",
      imageAlt: post.image_alt ?? "",
      seoTitle: post.seo_title ?? "",
      seoDescription: post.seo_description ?? "",
      status: post.status,
      references: refs,
      revision: post.revision ?? 1,
    });

    setDirty(false);
    setSlugTouched(true);
    setMessage("");
    setActiveTab("write");

    const history = await fetch(`/api/admin/posts/${id}/revisions`, { cache: "no-store" });
    if (history.ok) {
      const data = await history.json() as { revisions?: Revision[] };
      setRevisions(data.revisions ?? []);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(statusOverride?: PostStatus) {
    if (!editor.title.trim()) {
      setMessage("Önce yazının başlığını girin.");
      return;
    }

    setSaving(true);
    setMessage("");

    const status = statusOverride ?? editor.status;
    const payload = {
      ...editor,
      status,
      categoryId: editor.categoryId ? Number(editor.categoryId) : null,
      referencesJson: JSON.stringify(editor.references),
    };

    const response = await fetch(
      editor.id ? `/api/admin/posts/${editor.id}` : "/api/admin/posts",
      {
        method: editor.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json() as { message?: string; id?: number };
    setSaving(false);

    if (!response.ok) {
      setMessage(data.message ?? "Kaydetme sırasında bir hata oluştu.");
      return;
    }

    const id = editor.id ?? data.id;
    setDirty(false);
    setMessage(status === "published" ? "Yazı kaydedildi ve yayında." : "Taslak kaydedildi.");

    if (id) await openPost(id);
    await loadList();
  }

  async function deletePost(post: BlogPost) {
    if (!window.confirm(`"${post.title}" kalıcı olarak silinsin mi?`)) return;
    await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (editor.id === post.id) {
      setEditor(freshPost);
      setDirty(false);
    }
    await loadList();
  }

  function addReference() {
    update("references", [
      ...editor.references,
      { id: crypto.randomUUID(), title: "", url: "", note: "" },
    ]);
  }

  function updateReference(id: string, key: keyof ReferenceItem, value: string) {
    update(
      "references",
      editor.references.map((item) => item.id === id ? { ...item, [key]: value } : item),
    );
  }

  function removeReference(id: string) {
    update("references", editor.references.filter((item) => item.id !== id));
  }

  async function restoreRevision(revisionId: number) {
    if (!editor.id) return;
    if (!window.confirm("Bu eski sürüme dönülsün mü? Mevcut hal de geçmişte saklanacak.")) return;
    const response = await fetch(
      `/api/admin/posts/${editor.id}/revisions/${revisionId}/restore`,
      { method: "POST" },
    );
    if (response.ok) {
      setMessage("Eski sürüm geri yüklendi.");
      await openPost(editor.id);
      await loadList();
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const seoChecks = [
    { label: "Başlık", ok: editor.title.trim().length >= 10, text: "Başlık açıklayıcı görünüyor." },
    { label: "Adres", ok: Boolean(editor.slug), text: "Sayfa adresi hazır." },
    { label: "Özet", ok: editor.excerpt.trim().length >= 40, text: "Blog kartı için kısa özet." },
    {
      label: "Google açıklaması",
      ok: editor.seoDescription.length >= 70 && editor.seoDescription.length <= 165,
      text: "Önerilen uzunluk 70–165 karakter.",
    },
    {
      label: "Görsel açıklaması",
      ok: !editor.featuredImage || Boolean(editor.imageAlt.trim()),
      text: "Kapak görseli varsa açıklama ekleyin.",
    },
  ];

  return (
    <main className="admin-page cms-v2">
      <header className="admin-topbar">
        <div>
          <span className="admin-eyebrow">HANDE ÖNER</span>
          <strong>Blog Yönetimi</strong>
        </div>
        <div className="admin-topbar-actions">
          {dirty && <span className="unsaved-indicator">● Kaydedilmemiş değişiklik</span>}
          <a href={editor.language === "tr" ? "/blog" : "/en/blog"} target="_blank" rel="noreferrer">Blogu Gör ↗</a>
          <button type="button" onClick={logout}>Çıkış</button>
        </div>
      </header>

      <div className="cms-v2-shell">
        <aside className="cms-library">
          <div className="cms-library-title">
            <div>
              <span>YAZILAR</span>
              <strong>{posts.length} yazı</strong>
            </div>
            <button type="button" onClick={startNew}>+ Yeni Yazı</button>
          </div>

          <div className="cms-search">
            <input
              value={search}
              placeholder="Yazılarda ara..."
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void loadList();
              }}
            />
            <div>
              <select value={languageFilter} onChange={(event) => setLanguageFilter(event.target.value)}>
                <option value="">TR + EN</option>
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="">Tümü</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
              </select>
              <button type="button" onClick={() => void loadList()}>Ara</button>
            </div>
          </div>

          <div className="cms-library-list">
            {loading ? (
              <p className="admin-muted">Yükleniyor...</p>
            ) : posts.length === 0 ? (
              <p className="admin-muted">Yazı bulunamadı.</p>
            ) : posts.map((post) => (
              <article key={post.id} className={`cms-library-row ${editor.id === post.id ? "is-selected" : ""}`}>
                <button type="button" onClick={() => void openPost(post.id)}>
                  <div className="cms-row-top">
                    <span className={`cms-status-dot ${post.status}`} />
                    <span>{post.language.toUpperCase()}</span>
                    <span>{post.status === "published" ? "Yayında" : "Taslak"}</span>
                  </div>
                  <strong>{post.title}</strong>
                  <small>Son değişiklik: {new Date(post.updated_at).toLocaleDateString("tr-TR")}</small>
                </button>
                <button className="cms-row-delete" type="button" onClick={() => void deletePost(post)} title="Sil">×</button>
              </article>
            ))}
          </div>
        </aside>

        <section className="cms-workspace">
          <div className="cms-workspace-header">
            <div className="cms-title-input-wrap">
              <span>{editor.id ? `YAZI #${editor.id} · SÜRÜM ${editor.revision}` : "YENİ YAZI"}</span>
              <input
                className="cms-title-input"
                value={editor.title}
                placeholder="Yazının başlığı..."
                onChange={(event) => update("title", event.target.value)}
              />
            </div>

            <div className="cms-publish-actions">
              {editor.status === "published" && <span className="published-badge">● Yayında</span>}
              <button type="button" className="admin-ghost-button" disabled={saving} onClick={() => void save("draft")}>Taslak Kaydet</button>
              <button id="cms-main-save" type="button" className="admin-primary-button" disabled={saving} onClick={() => void save()}>
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button type="button" className="cms-publish-button" disabled={saving} onClick={() => void save("published")}>Yayınla</button>
            </div>
          </div>

          {message && <div className="cms-toast">{message}</div>}

          <nav className="cms-tabs">
            <button type="button" className={activeTab === "write" ? "is-active" : ""} onClick={() => setActiveTab("write")}>Yazı</button>
            <button type="button" className={activeTab === "references" ? "is-active" : ""} onClick={() => setActiveTab("references")}>Kaynaklar {editor.references.length ? `(${editor.references.length})` : ""}</button>
            <button type="button" className={activeTab === "seo" ? "is-active" : ""} onClick={() => setActiveTab("seo")}>Google / SEO</button>
            <button type="button" className={activeTab === "history" ? "is-active" : ""} disabled={!editor.id} onClick={() => setActiveTab("history")}>Geçmiş</button>
          </nav>

          {activeTab === "write" && (
            <div className="cms-panel">
              <div className="cms-basic-fields">
                <label>
                  <span>Dil</span>
                  <select value={editor.language} onChange={(event) => update("language", event.target.value as Language)}>
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </label>
                <label>
                  <span>Kategori</span>
                  <select value={editor.categoryId} onChange={(event) => update("categoryId", event.target.value)}>
                    <option value="">Kategori seçin</option>
                    {availableCategories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="cms-field">
                <span>Kısa Özet</span>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={editor.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  placeholder="Yazının kısa özeti..."
                />
                <small>{editor.excerpt.length}/500</small>
              </label>

              <div className="cms-field">
                <div className="cms-field-title">
                  <span>Yazının İçeriği</span>
                  <small>Word gibi kullanın; metni seçip yukarıdaki araçlardan biçimlendirin.</small>
                </div>
                <RichEditor
                  value={editor.contentJson}
                  onChange={(json, html) => {
                    setEditor((current) => ({ ...current, contentJson: json, contentHtml: html }));
                    setDirty(true);
                  }}
                />
              </div>

              <details className="cms-optional-section">
                <summary>Kapak görseli ekle / değiştir</summary>
                <div className="cms-basic-fields">
                  <label>
                    <span>Görsel adresi</span>
                    <input value={editor.featuredImage} onChange={(event) => update("featuredImage", event.target.value)} placeholder="/images/blog/..." />
                  </label>
                  <label>
                    <span>Görsel açıklaması</span>
                    <input value={editor.imageAlt} onChange={(event) => update("imageAlt", event.target.value)} placeholder="Görselde ne var?" />
                  </label>
                </div>
              </details>

              <section className="cms-live-preview">
                <div className="cms-field-title">
                  <span>Canlı Önizleme</span>
                  <small>Yazının yaklaşık görünümü.</small>
                </div>
                <article>
                  <span className="preview-category">
                    {availableCategories.find((item) => String(item.id) === editor.categoryId)?.name ?? "Blog"}
                  </span>
                  <h1>{editor.title || "Yazı başlığı"}</h1>
                  {editor.excerpt && <p className="preview-excerpt">{editor.excerpt}</p>}
                  <div className="preview-rich-content" dangerouslySetInnerHTML={{ __html: editor.contentHtml || "<p>İçerik burada görünecek.</p>" }} />
                </article>
              </section>
            </div>
          )}

          {activeTab === "references" && (
            <div className="cms-panel">
              <div className="cms-panel-intro">
                <div>
                  <span>KAYNAKLAR / REFERANSLAR</span>
                  <h2>Kullandığınız kaynakları ekleyin.</h2>
                  <p>Kaynaklar yazının sonunda otomatik olarak sıralanır ve bağlantılar tıklanabilir olur.</p>
                </div>
                <button type="button" className="admin-primary-button" onClick={addReference}>+ Kaynak Ekle</button>
              </div>

              {editor.references.length === 0 ? (
                <div className="cms-empty-state">
                  <strong>Henüz kaynak yok.</strong>
                  <p>Makale, kitap veya web kaynağı ekleyebilirsiniz.</p>
                </div>
              ) : (
                <div className="reference-list">
                  {editor.references.map((reference, index) => (
                    <article className="reference-editor-card" key={reference.id}>
                      <div className="reference-number">{index + 1}</div>
                      <div className="reference-fields">
                        <label>
                          <span>Kaynak adı</span>
                          <input value={reference.title} onChange={(event) => updateReference(reference.id, "title", event.target.value)} placeholder="Kaynak / makale adı" />
                        </label>
                        <label>
                          <span>Bağlantı</span>
                          <input type="url" value={reference.url} onChange={(event) => updateReference(reference.id, "url", event.target.value)} placeholder="https://..." />
                        </label>
                        <label>
                          <span>Kısa not (isteğe bağlı)</span>
                          <input value={reference.note ?? ""} onChange={(event) => updateReference(reference.id, "note", event.target.value)} placeholder="Yazar, yıl, dergi vb." />
                        </label>
                      </div>
                      <button type="button" className="reference-remove" onClick={() => removeReference(reference.id)}>Sil</button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "seo" && (
            <div className="cms-panel">
              <div className="cms-panel-intro">
                <div>
                  <span>GOOGLE / SEO</span>
                  <h2>Google görünümünü düzenleyin.</h2>
                  <p>Teknik bilgi gerektirmez. Boş bırakılan SEO başlığında normal yazı başlığı kullanılır.</p>
                </div>
              </div>

              <label className="cms-field">
                <span>Sayfa adresi</span>
                <div className="slug-field">
                  <span>{editor.language === "tr" ? "/blog/" : "/en/blog/"}</span>
                  <input
                    value={editor.slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      update("slug", slugify(event.target.value));
                    }}
                  />
                </div>
                <small>Mevcut yayımlanmış yazılarda gereksiz yere değiştirmeyin.</small>
              </label>

              <label className="cms-field">
                <span>Google başlığı</span>
                <input value={editor.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} placeholder={editor.title || "Yazı başlığı"} />
              </label>

              <label className="cms-field">
                <span>Google açıklaması</span>
                <textarea rows={3} maxLength={320} value={editor.seoDescription} onChange={(event) => update("seoDescription", event.target.value)} />
                <small>{editor.seoDescription.length}/320</small>
              </label>

              <div className="seo-snippet-preview">
                <span>handeoner.com/{editor.language === "tr" ? "blog" : "en/blog"}/{editor.slug || "ornek-yazi"}</span>
                <strong>{editor.seoTitle || editor.title || "Yazı başlığı"}</strong>
                <p>{editor.seoDescription || editor.excerpt || "Google açıklaması burada görünecek."}</p>
              </div>

              <div className="seo-checks">
                {seoChecks.map((check) => (
                  <div key={check.label} className={check.ok ? "is-ok" : "is-warning"}>
                    <span>{check.ok ? "✓" : "!"}</span>
                    <div><strong>{check.label}</strong><p>{check.text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="cms-panel">
              <div className="cms-panel-intro">
                <div>
                  <span>SÜRÜM GEÇMİŞİ</span>
                  <h2>Bir değişiklikten vazgeçerseniz geri dönün.</h2>
                  <p>Her kaydetmeden önce mevcut sürüm otomatik saklanır.</p>
                </div>
              </div>

              {revisions.length === 0 ? (
                <div className="cms-empty-state"><strong>Henüz eski sürüm yok.</strong><p>Yazıyı düzenledikçe burada oluşur.</p></div>
              ) : (
                <div className="revision-list">
                  {revisions.map((revision) => (
                    <article key={revision.id}>
                      <div>
                        <strong>Sürüm {revision.revision}</strong>
                        <span>{new Date(revision.created_at).toLocaleString("tr-TR")}</span>
                      </div>
                      <button type="button" onClick={() => void restoreRevision(revision.id)}>Bu sürüme dön</button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          <footer className="cms-sticky-save">
            <div>
              <strong>{editor.status === "published" ? "Bu yazı yayında." : "Bu yazı taslak."}</strong>
              <span>{dirty ? "Kaydedilmemiş değişiklikler var." : "Tüm değişiklikler kaydedildi."}</span>
            </div>
            <div>
              <span className="keyboard-hint">Ctrl + S</span>
              <button type="button" className="admin-primary-button" disabled={saving} onClick={() => void save()}>
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
