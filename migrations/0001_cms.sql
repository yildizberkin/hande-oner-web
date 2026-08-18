PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('tr', 'en')),
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(slug, language)
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('tr', 'en')),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category_id INTEGER,
  featured_image TEXT,
  image_alt TEXT,
  seo_title TEXT,
  seo_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
  UNIQUE(slug, language)
);

CREATE INDEX IF NOT EXISTS idx_posts_language_status_published
  ON posts(language, status, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_category
  ON posts(category_id);

CREATE INDEX IF NOT EXISTS idx_posts_title
  ON posts(title);

INSERT OR IGNORE INTO categories (slug, language, name) VALUES
  ('kaygi', 'tr', 'Kaygı'),
  ('iliskiler', 'tr', 'İlişkiler'),
  ('yasam-degisiklikleri', 'tr', 'Yaşam Değişiklikleri'),
  ('anxiety', 'en', 'Anxiety'),
  ('relationships', 'en', 'Relationships'),
  ('life-changes', 'en', 'Life Changes');
