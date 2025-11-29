import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jason Chaskin",
  description: "Applications & research at the Ethereum Foundation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
