HANDE CMS V2.5 — PRODUCTION BUILD TYPE FIX

This patch intentionally does NOT contain wrangler.jsonc, so your real production
D1 database_id is not overwritten.

Fixes:
1. RichEditor TypeScript nullability error:
   'editor' is possibly 'null'
2. Makes Cloudflare type generation deterministic:
   npm run cf-typegen
   -> worker-configuration.d.ts

Why the other TypeScript errors happened:
D1Database was not yet available to TypeScript. Because getDb() then lost its D1
type, the downstream query results also became any, producing the map() implicit-any
errors in blog and sitemap files.

Apply:
- Extract this zip over the project root and replace files.
- Run:
    npm install
    npm run cf-typegen
    npm run build

Expected:
- worker-configuration.d.ts appears in the project root.
- D1Database becomes known to TypeScript.
- blog/sitemap map() types infer correctly.
- production build passes type checking.

IMPORTANT:
Do not replace or revert wrangler.jsonc. It now contains your real remote D1 ID.
