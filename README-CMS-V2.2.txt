CMS V2.2 — EDITOR SCROLL POLISH

Changes:
- Long blog content now scrolls inside the editor.
- Editor height stays controlled instead of stretching the whole admin page.
- Toolbar stays visible at the top of the editor while writing.
- Bottom helper bar stays visible.
- Stable scrollbar gutter reduces layout shifting.
- Desktop, tablet and mobile heights are tuned separately.
- Link modal from V2.1 is preserved.
- Save / Draft / Publish behavior is unchanged.
- No new database migration is required.

Apply:
1. Extract this package over the project root and replace files.
2. Run:
   npm install
   npm run dev

Test:
- Open /admin
- Open a long article or paste a long text.
- The text area should scroll internally.
- Formatting toolbar should remain visible.
