HANDE CMS V2.6 — NEXT.JS 16 RESPONSE.JSON TYPE FIX

This patch fixes the current production build errors caused by Response.json()
being typed as unknown under the project's strict TypeScript setup.

Fixed files:
- app/admin/AdminDashboard.tsx
- app/admin/login/page.tsx
- app/page.tsx
- app/en/page.tsx

What changed:
- API JSON responses now have explicit TypeScript response shapes.
- No behavior or UI logic changed.
- Save / Draft / Publish behavior is untouched.
- No database changes.
- No migration.
- No wrangler.jsonc included.
- No production D1 ID or secrets are touched.
- worker-configuration.d.ts is not replaced.

Apply:
1. Extract over project root and replace files.
2. Run:
   npm run build

If the build passes, continue with the Cloudflare deployment step.
