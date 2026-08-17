HANDE ÖNER CONTACT FORM - DROP-IN FILES

Replace/copy these files exactly:

1) app/page.tsx
2) app/en/page.tsx
3) app/globals.css
4) app/api/contact/route.ts
5) copy .env.local.example to .env.local

Then run:
npm run dev

Expected local behavior before Resend keys are configured:
- The form submits to /api/contact.
- The hidden honeypot field is NOT visible.
- Turnstile is skipped locally if its secret is not configured.
- The API returns the "contact service is not configured" message until
  RESEND_API_KEY and CONTACT_FROM_EMAIL are provided.

Do not commit .env.local.
