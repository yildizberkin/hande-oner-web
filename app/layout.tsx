import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "Hande Öner | Uzman Psikolog",
    template: "%s | Hande Öner",
  },
  description:
    "Uzman Psikolog Hande Öner, yetişkinlere Türkçe ve İngilizce yüz yüze ve çevrimiçi psikoterapi hizmeti sunmaktadır.",
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
      "tr-TR": `${siteUrl}/`,
      "en-GB": `${siteUrl}/en`,
    },
  },
  openGraph: {
    title: "Hande Öner | Uzman Psikolog",
    description:
      "Yetişkinlere yönelik yüz yüze ve çevrimiçi psikoterapi. Türkçe ve İngilizce görüşme seçeneği.",
    url: `${siteUrl}/`,
    siteName: "Hande Öner",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
