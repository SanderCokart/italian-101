import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { ProgressProvider } from "@/components/ProgressProvider";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Italian 101 — A1 Course",
  description:
    "An interactive A1 Italian course: 24 lessons across 6 units with practice and progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ProgressProvider>
          <SiteHeader />
          <main className="page">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
