import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

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
      <body>
        <div className="min-h-screen text-slate-900">
          <Navbar />
          <div className="md:flex">
            <Sidebar />
            <div className="w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
