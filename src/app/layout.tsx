import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/landing/footer";
import ContactImage from "@/components/landing/contactImage";
import Navbar from "@/components/landing/navbar";
import Whatsapplink from "@/components/landing/whatsapplink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gordilloarquitectos.mx"),
  authors: [{ name: "Gordillo Arquitectos" }],

  creator: "Gordillo Arquitectos",

  publisher: "Gordillo Arquitectos",
  alternates: {
    canonical: "https://gordilloarquitectos.mx",
  },

  title: "Gordillo Arquitectos - Constructora en Guanajuato",
  description: "Gordillo Arquitectos, despacho de arquitectura y constructora en Guanajuato, especializado en diseño arquitectónico y construcción de proyectos residenciales y comerciales con calidad e innovación.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Gordillo Arquitectos",
    capable: true,
    statusBarStyle: "default",
  },
  // Facebook / Open Graph
  openGraph: {
    title: "Gordillo Arquitectos",
    description: "Gordillo Arquitectos, despacho de arquitectura y constructora en Guanajuato, especializado en diseño arquitectónico y construcción de proyectos residenciales y comerciales con calidad e innovación.",
    url: "https://gordilloarquitectos.mx",
    siteName: "Gordillo Arquitectos",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "Construcción y Diseño Arquitectónico en Guanajuato",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Gordillo Arquitectos",
    description: "Gordillo Arquitectos, despacho de arquitectura y constructora en Guanajuato, especializado en diseño arquitectónico y construcción de proyectos residenciales y comerciales con calidad e innovación.",
    images: ["/web-app-manifest-512x512.png"],
  },

  keywords: [
    "arquitectos guanajuato",
    "constructora guanajuato",
    "diseño arquitectónico",
    "construcción residencial",
    "arquitectura méxico",
    "gordillo arquitectos"
  ],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Whatsapplink />
        <ContactImage />
        <Footer />
      </body>
    </html>
  );
}
