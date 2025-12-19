import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SynqBiz - Co-Founder Accountability Dashboard",
  description: "Track progress, metrics, and partnership commitments for SponsorSynq co-founders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
