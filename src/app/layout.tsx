import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Bebas_Neue, Roboto, JetBrains_Mono, Saira_Stencil_One, Comfortaa } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const ethnocentric = localFont({
  src: "../../public/fonts/Ethnocentric.otf",
  variable: "--font-ethnocentric",
  display: "swap",
});

const nulshock = localFont({
  src: "../../public/fonts/Nulshock Bd.otf",
  variable: "--font-nulshock",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-horizontal",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  variable: "--font-hero-roboto",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-hero-code",
  subsets: ["latin"],
  weight: ["200", "300"],
});

const sairaStencil = Saira_Stencil_One({
  variable: "--font-hero-name",
  subsets: ["latin"],
  weight: "400",
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Kaiden McIntosh",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kaiden McIntosh",
    jobTitle: "Frontend Web Developer",
    url: siteConfig.siteUrl,
    sameAs: [
      "https://github.com/Kaiden2707",
      "https://instagram.com/Kaiden.xo",
    ],
  };

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${bebasNeue.variable} ${roboto.variable} ${jetbrainsMono.variable} ${sairaStencil.variable} ${ethnocentric.variable} ${nulshock.variable} ${comfortaa.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
