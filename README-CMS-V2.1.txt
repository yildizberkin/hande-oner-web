CMS V2.1 — LINK UX FIX

This patch keeps Save / Save Draft / Publish behavior unchanged.

What changed:
- The inline link form was removed.
- Link editing now opens in a centered modal.
- The editor toolbar no longer changes height or overlaps the link form.
- Existing links can be edited or removed from the same modal.
- Enter applies the link.
- Escape closes the modal.
- Clicking outside the modal closes it.
- Mobile layout included.

Apply:
Copy this package over the project root and replace existing files.

Then:
npm install
npm run dev

No new D1 migration is required for V2.1.

Authentication:
See AUTH-HANDOFF-PLAN.txt.
Email OTP + forgot-password/reset will be implemented at final handoff when the real
domain and mail infrastructure are available.
