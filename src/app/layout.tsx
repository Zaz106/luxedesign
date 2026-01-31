import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import GradualBlur from "../components/ui/GradualBlur";
import "./globals.css";

// Instrument Sans is variable by default, ensuring all weights 400-700 are available
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxe - Digital Solutions",
  description: "We design, develop, and deploy scalable digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable}`}>
      <body>
        <GradualBlur
          target="page"
          position="bottom"
          height="4rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
        />
        {children}
      </body>
    </html>
  );
}
