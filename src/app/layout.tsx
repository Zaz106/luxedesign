import type { Metadata } from "next";
import { Instrument_Sans, Alex_Brush } from "next/font/google";
import ScrollGradualBlur from "../components/layout/ScrollGradualBlur";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "./seo";
import "./globals.css";

// Instrument Sans is variable by default, ensuring all weights 400-700 are available
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Luxe Designs",
    template: "%s | Luxe Designs",
  },
  description:
    "Luxe Designs creates conversion-focused websites and digital products for modern businesses.",
  openGraph: {
    title: "Luxe Designs",
    description:
      "Luxe Designs creates conversion-focused websites and digital products for modern businesses.",
    url: "/",
    siteName: "Luxe Designs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${alexBrush.variable}`}>
      <body>
        <ScrollGradualBlur />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
