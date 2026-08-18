import StarterKit from "@tiptap/starter-kit";

export const editorExtensions = [
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
];
