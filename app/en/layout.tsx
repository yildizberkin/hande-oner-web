import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Hande Öner | Psychologist",
    template: "%s | Hande Öner",
  },
  description:
    "Psychologist Hande Öner offers face-to-face and online psychotherapy for adults in Turkish and English.",
  alternates: {
    canonical: "/en",
    languages: {
      "tr-TR": "/",
      "en-GB": "/en",
    },
  },
  openGraph: {
    title: "Hande Öner | Psychologist",
    description:
      "Face-to-face and online psychotherapy for adults in Turkish and English.",
    type: "website",
    locale: "en_GB",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}