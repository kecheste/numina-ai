import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { gotham, arp80, fangsong, montserrat } from "@/app/fonts";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  title: "Numina - Spiritual Intelligence",
  description:
    "Your personal guide to self-discovery through astrology, numerology, and modern psychology",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${gotham.variable} ${arp80.variable} ${fangsong.variable} ${montserrat.variable} overflow-hidden`}
      >
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
