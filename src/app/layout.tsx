import type { Metadata, Viewport } from "next";
import {
  Anton,
  Barlow_Condensed,
  Bricolage_Grotesque,
  Fraunces,
  Instrument_Sans,
  Outfit,
} from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/config/site";

/* Tipografías de la marca: display con carácter + sans legible. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Tipografías de los giros: una por tipo de negocio. No se precargan
   porque se usan más abajo en la página. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
  display: "swap",
  preload: false,
});

const fontVariables = [display, sans, fraunces, anton, outfit, barlow]
  .map((font) => font.variable)
  .join(" ");

/**
 * URL pública del sitio, solo para resolver las imágenes de Open Graph.
 * En Vercel se detecta sola; NEXT_PUBLIC_SITE_URL permite forzar un dominio.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: `${site.brand} · Ejemplos`,
  authors: [{ name: site.brand, url: site.portfolioUrl }],
  creator: site.brand,
  keywords: [
    "sitios web animados",
    "páginas web para negocios",
    "desarrollo web Aguascalientes",
    "animaciones de scroll",
    "scrollytelling",
    "DiegoDev",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: `${site.brand} · Ejemplos`,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c0b10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={fontVariables}>
      <body>
        {/* Sin JavaScript no hay animación: se muestra todo en su versión estática. */}
        <noscript>
          <style>{`[data-prehide]{visibility:visible!important}[data-stage-pin]{position:static!important;height:auto!important}[data-stage-scene]{position:relative!important;min-height:100svh}`}</style>
        </noscript>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}
