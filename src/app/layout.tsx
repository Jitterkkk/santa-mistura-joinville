import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { site, SITE_URL } from "@/data/site";
import { restaurantJsonLd } from "@/data/jsonld";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const DESCRIPTION =
  "Restaurante de cozinha internacional em Joinville/SC, com arte, adega e eventos no mesmo salão. Aberto desde 2012 — almoço executivo, jantar e drinks autorais.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Gastronomia, Arte e Eventos em Joinville`,
    template: `%s · ${site.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "restaurante em Joinville",
    "cozinha internacional Joinville",
    "Santa Mistura",
    "restaurante Joinville SC",
    "drinks autorais Joinville",
    "almoço executivo Joinville",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} — Gastronomia, Arte e Eventos em Joinville`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Gastronomia, Arte e Eventos em Joinville`,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f3f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
