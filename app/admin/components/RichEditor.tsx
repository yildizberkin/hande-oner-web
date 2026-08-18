"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";

const emptyDoc: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

function parse(value: string): JSONContent {
  try {
    const parsed = JSON.parse(value) as JSONContent;
    return parsed?.type === "doc" ? parsed : emptyDoc;
  } catch {
    return emptyDoc;
  }
}

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (json: string, html: string, text: string) => void;
}) {
  const [linkPanel, setLinkPanel] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          defaultProtocol: "https",
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
        underline: {},
      }),
    ],
    content: parse(value),
    editorProps: {
      attributes: { class: "tiptap-editor-surface" },
    },
    onUpdate({ editor }) {
      onChange(
        JSON.stringify(editor.getJSON()),
        editor.getHTML(),
        editor.getText(),
      );
    },
  });

  useEffect(() => {
    if (!editor) return;
    const incoming = parse(value);
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(incoming)) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="rich-editor-loading">Editör hazırlanıyor...</div>;
  }

  function applyLink() {
    const href = linkUrl.trim();
    if (!href) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setLinkPanel(false);
    setLinkUrl("");
  }

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" role="toolbar" aria-label="Yazı araçları">
        <div className="toolbar-group">
          <button type="button" title="Kalın" className={editor.isActive("bold") ? "is-active" : ""} onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></button>
          <button type="button" title="İtalik" className={editor.isActive("italic") ? "is-active" : ""} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></button>
          <button type="button" title="Altı çizili" className={editor.isActive("underline") ? "is-active" : ""} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
        </div>

        <div className="toolbar-group">
          <button type="button" className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>Başlık</button>
          <button type="button" className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>Alt başlık</button>
          <button type="button" className={editor.isActive("blockquote") ? "is-active" : ""} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Alıntı</button>
        </div>

        <div className="toolbar-group">
          <button type="button" className={editor.isActive("bulletList") ? "is-active" : ""} onClick={() => editor.chain().focus().toggleBulletList().run()}>• Liste</button>
          <button type="button" className={editor.isActive("orderedList") ? "is-active" : ""} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. Liste</button>
        </div>

        <div className="toolbar-group">
          <button
            type="button"
            className={editor.isActive("link") ? "is-active" : ""}
            onClick={() => {
              setLinkUrl(editor.getAttributes("link").href ?? "");
              setLinkPanel(true);
            }}
          >
            🔗 Link
          </button>
          {editor.isActive("link") && (
            <button type="button" onClick={() => editor.chain().focus().unsetLink().run()}>Linki kaldır</button>
          )}
        </div>

        <div className="toolbar-group toolbar-history">
          <button type="button" title="Geri al" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>↶</button>
          <button type="button" title="İleri al" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>↷</button>
        </div>
      </div>

      {linkPanel && (
        <div
          className="rich-link-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLinkPanel(false);
            }
          }}
        >
          <div
            className="rich-link-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rich-link-modal-title"
          >
            <div className="rich-link-modal-heading">
              <div>
                <span>BAĞLANTI</span>
                <strong id="rich-link-modal-title">
                  {editor.isActive("link")
                    ? "Bağlantıyı düzenle"
                    : "Bağlantı ekle"}
                </strong>
              </div>

              <button
                type="button"
                className="rich-link-modal-close"
                aria-label="Kapat"
                onClick={() => setLinkPanel(false)}
              >
                ×
              </button>
            </div>

            <p className="rich-link-modal-help">
              Link vermek istediğiniz metni seçin ve adresi aşağıya yapıştırın.
            </p>

            <label className="rich-link-modal-field">
              <span>Bağlantı adresi</span>
              <input
                type="url"
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                placeholder="https://..."
                autoFocus
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    applyLink();
                  }

                  if (event.key === "Escape") {
                    setLinkPanel(false);
                  }
                }}
              />
            </label>

            <div className="rich-link-modal-actions">
              {editor.isActive("link") && (
                <button
                  type="button"
                  className="rich-link-remove-button"
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setLinkPanel(false);
                    setLinkUrl("");
                  }}
                >
                  Linki kaldır
                </button>
              )}

              <div>
                <button
                  type="button"
                  className="rich-link-cancel-button"
                  onClick={() => setLinkPanel(false)}
                >
                  Vazgeç
                </button>
                <button
                  type="button"
                  className="rich-link-apply-button"
                  onClick={applyLink}
                >
                  Uygula
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EditorContent editor={editor} />

      <div className="rich-editor-help">
        <span>Metni seçerek biçimlendirebilirsiniz.</span>
        <span>Link için metni seçin → “Link”.</span>
      </div>
    </div>
  );
}
