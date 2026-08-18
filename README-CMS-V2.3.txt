CMS V2.3 — TIPTAP DUPLICATE EXTENSION FIX

This version fixes the warning:
[tiptap warn]: Duplicate extension names found: ['link', 'underline'].

Cause:
StarterKit in Tiptap v3 already includes Link and Underline, while the CMS also
registered separately configured Link and Underline extensions.

Fix:
- StarterKit's built-in link extension is disabled.
- StarterKit's built-in underline extension is disabled.
- The separately configured Link and Underline extensions remain active.
- Existing link modal behavior is preserved.
- Existing editor scroll/sticky toolbar behavior is preserved.
- Save / Draft / Publish behavior is unchanged.
- No database migration is required.

Apply:
Extract over the project root and replace files.

Then:
npm install
npm run dev

Expected result:
The duplicate extension warning should no longer appear.
