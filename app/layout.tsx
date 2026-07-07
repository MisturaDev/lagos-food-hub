import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lagos Food Hub",
  description: "Connecting surplus food to communities in need.",
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
