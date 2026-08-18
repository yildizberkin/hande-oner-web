CMS V2.4 — STARTERKIT CLEANUP

Fixes:
- Link and Underline now come from StarterKit only.
- Separate Link / Underline registrations were removed completely.
- Link is configured inside StarterKit with:
  - openOnClick: false
  - autolink: true
  - linkOnPaste: true
  - defaultProtocol: https
  - target: _blank
  - rel: noopener noreferrer
- Underline remains enabled through StarterKit.
- Client editor and server-side public renderer now use the same configuration.

Preserved:
- Link modal
- Editor internal scrolling
- Sticky toolbar
- References
- Revision history
- Save / Draft / Publish behavior
- Existing D1 data

No migration is required.

Apply:
1. Extract over the project root and replace files.
2. Run:
   npm install
   npm run dev

Expected:
The warning below should disappear:
[tiptap warn]: Duplicate extension names found: ['link', 'underline']
