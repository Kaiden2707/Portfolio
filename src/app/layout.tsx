import type { Metadata } from "next";
import { Geist, Bebas_Neue, Roboto, JetBrains_Mono, Saira_Stencil_One } from "next/font/google";
import { GlobalLiquidBackground } from "@/components/GlobalLiquidBackground";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Kaiden McIntosh | Portfolio",
  description:
    "Portfolio website for Kaiden McIntosh — dark, minimalist, techy UI with a purple accent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${bebasNeue.variable} ${roboto.variable} ${jetbrainsMono.variable} ${sairaStencil.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <GlobalLiquidBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
