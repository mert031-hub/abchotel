import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "ABC Apart Hotel — Antalya Apart Otel | Muratpaşa",
  description:
    "ABC Apart Hotel, Antalya Muratpaşa'da konforlu, temiz ve sessiz apart daireler sunmaktadır. Düden Şelalesine 2 dakika, Lara Plajına 10 dakika mesafede. Aile tatilleri ve uzun süreli konaklamalar için idealdir.",
  keywords: [
    "Antalya apart hotel",
    "Lara apart otel",
    "Muratpaşa konaklama",
    "Antalya daire kiralama",
    "Düden Şelalesi yakın otel",
    "aile apart Antalya",
    "Antalya apartment hotel",
    "stay near Düden Waterfall",
    "Muratpaşa accommodation",
    "ABC Apart",
  ],
  metadataBase: new URL("https://abcaparthotel.com"),
  authors: [{ name: "ABC Apart Hotel" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://abcaparthotel.com",
    siteName: "ABC Apart Hotel",
    title: "ABC Apart Hotel — Antalya Apart Otel",
    description:
      "Antalya Muratpaşa'da konforlu, temiz ve sessiz apart daireler. Düden Şelalesine 2 dakika, Lara Plajına 10 dakika mesafede.",
    images: [
      {
        url: "/images/salon.avif",
        width: 1200,
        height: 630,
        alt: "ABC Apart Hotel — Antalya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC Apart Hotel — Antalya Apart Otel",
    description:
      "Antalya Muratpaşa'da konforlu, temiz ve sessiz apart daireler. Düden Şelalesine 2 dakika mesafede.",
    images: ["/images/salon.avif"],
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
  // suppressHydrationWarning on html+body suppresses browser-extension attribute injections (e.g. bis_skin_checked)
  return (
    <html lang="tr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
