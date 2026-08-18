HANDE ÖNER — WORK AREAS + SEO FOUNDATION

This package is a full replacement/addition set.

Copy the folders/files into the project root, preserving paths.
Existing app/page.tsx, app/en/page.tsx and app/globals.css should be replaced
by the versions in this package.

New architecture:
- lib/work-areas.ts: shared bilingual work-area content
- lib/site.ts: single site URL source
- app/calisma-alanlari/[slug]/page.tsx: 8 Turkish SEO detail pages
- app/en/areas-of-work/[slug]/page.tsx: 8 English SEO detail pages
- home flip cards now include real internal "Detaylı bilgi / Read more" links
- sitemap contains all 16 work-area URLs with language alternates
- robots uses an absolute sitemap URL and blocks /admin + /api
- root metadata no longer says "Create Next App"

Before production:
Set NEXT_PUBLIC_SITE_URL to the final production origin, e.g.
NEXT_PUBLIC_SITE_URL=https://handeoner.com

Do not set the final value until the domain decision is confirmed.

Test:
npm run build
npm run dev

Routes to test:
TR:
  /calisma-alanlari/kaygi-bozukluklari
  /calisma-alanlari/depresyon
EN:
  /en/areas-of-work/anxiety-disorders
  /en/areas-of-work/depression

Also test:
  /sitemap.xml
  /robots.txt
