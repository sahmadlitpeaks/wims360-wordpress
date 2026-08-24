import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fontDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "WIMS 360 — The complete operating system for longevity & wellness",
    template: "%s · WIMS 360",
  },
  description:
    "WIMS 360 brings investigations, healing, live health data, communication and intelligent AI together in one connected platform. One client. One connected journey. One platform.",
  openGraph: {
    title:
      "WIMS 360 — The complete operating system for longevity & wellness",
    description:
      "WIMS 360 brings investigations, healing, live health data, communication and intelligent AI together in one connected platform. One client. One connected journey. One platform.",
    siteName: "WIMS 360",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} bg-bg text-ink font-body`}
      >
        {/*
          Reveal ships its hidden state in the server HTML so there is no flash
          of content before the observer arms. With scripting off nothing would
          ever reveal it, so unhide every reveal when there is no JS.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-green-deep focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.18em] focus:text-cream"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
