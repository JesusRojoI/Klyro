import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const instrumentSans = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Klyro — Soluciones Tecnológicas Inteligentes | Desarrollo de Software",
  description:
    "Impulsa tu negocio con soluciones de software a la medida. Desarrollo web, aplicaciones móviles y capacitación tecnológica con estándares de excelencia.",
  keywords: ["Klyro", "desarrollo de software", "aplicaciones web", "capacitación tecnológica", "software empresarial"],
  authors: [{ name: "Klyro" }],
  openGraph: {
    title: "Klyro — Soluciones Tecnológicas Inteligentes",
    description: "Impulsa tu negocio con soluciones de software a la medida",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${instrumentSans.variable} ${inter.variable}`}
    >
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-grab/dist/index.global.js"
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}