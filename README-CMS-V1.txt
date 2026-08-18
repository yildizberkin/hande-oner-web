HANDE ÖNER — CMS V1

WHAT THIS VERSION DOES
- Cloudflare D1 data model for categories and posts
- /admin password login with 12-hour HttpOnly session cookie
- Create / edit / delete blog posts
- Draft / published states
- Turkish / English content
- Category assignment
- Search/filter in admin
- Automatic slug generation + manual override
- SEO title + meta description
- Google-style snippet preview
- Concrete SEO checks (no fake score)
- Cover image URL + alt text
- Lightweight rich-writing toolbar:
  bold, italic, H2, H3, list, link
- DB-driven /blog and /en/blog
- Search, categories and pagination
- Dynamic /blog/[slug] and /en/blog/[slug]
- Drafts do not appear publicly
- Published posts automatically enter sitemap.xml
- Cloudflare/OpenNext configuration is prepared

NOT IN V1 YET
- R2 image upload/media library (currently image URL/path field)
- Cloudflare Access SSO. V1 has app-level admin password/session.
- Related posts / featured post
- old-slug redirect history
These are next phases, not temporary rewrites of the DB structure.

APPLY TO YOUR PROJECT
1. Extract this package somewhere.
2. From PowerShell, run:

   powershell -ExecutionPolicy Bypass -File .\apply-cms.ps1 -ProjectPath "C:\path\to\hande-oner-web"

Or copy the package contents over the repo manually, preserving paths.

3. In the project:

   npm install
   Copy-Item .dev.vars.example .dev.vars

4. Change CMS_ADMIN_PASSWORD and CMS_SESSION_SECRET in .dev.vars.

5. Create local D1 tables:

   npm run db:migrate:local

6. Start:

   npm run dev

7. Open:
   http://localhost:3000/admin

IMPORTANT CLOUDFLARE NOTE
wrangler.jsonc currently uses a zero placeholder for database_id.
This is intentional until Hande's Cloudflare account/final D1 database exists.
Local D1 works independently. When the real D1 is created, replace database_id
with the real ID and run the remote migration.

PRODUCTION SECURITY
- Never commit .dev.vars.
- Set CMS_ADMIN_PASSWORD and CMS_SESSION_SECRET as Cloudflare secrets.
- The admin session cookie is HttpOnly, SameSite=Strict, and Secure in production.
- /admin and /api are excluded from robots.txt by the existing SEO setup.

TEST BEFORE PUSH
npm run build

If build passes, test:
- /admin
- /blog
- /en/blog
- /sitemap.xml
