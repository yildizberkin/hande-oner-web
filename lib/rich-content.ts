import { renderToHTMLString } from "@tiptap/static-renderer/pm/html-string";
import type { JSONContent } from "@tiptap/core";
import { editorExtensions } from "@/lib/editor-extensions";

const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function parseContentJson(value: string | null | undefined): JSONContent {
  if (!value) return emptyDocument;
  try {
    const parsed = JSON.parse(value) as JSONContent;
    return parsed?.type === "doc" ? parsed : emptyDocument;
  } catch {
    return emptyDocument;
  }
}

export function renderRichContent(value: string | null | undefined) {
  return renderToHTMLString({
    extensions: editorExtensions,
    content: parseContentJson(value),
  });
}
