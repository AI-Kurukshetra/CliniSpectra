import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clinical AI Platform",
  description: "Next.js healthcare AI dashboard starter built with the App Router, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
