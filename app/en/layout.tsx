import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Hande Öner | Psychologist",
    template: "%s | Hande Öner",
  },
  description:
    "Psychologist Hande Öner offers face-to-face and online psychotherapy for adults in Turkish and English.",
  alternates: {
    canonical: `${siteUrl}/en`,
    languages: {
      "tr-TR": `${siteUrl}/`,
      "en-GB": `${siteUrl}/en`,
    },
  },
  openGraph: {
    title: "Hande Öner | Psychologist",
    description:
      "Face-to-face and online psychotherapy for adults in Turkish and English.",
    url: `${siteUrl}/en`,
    type: "website",
    locale: "en_GB",
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div lang="en">{children}</div>;
}
