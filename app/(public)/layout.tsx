import { Navbar } from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-slate-900">
      <Navbar />
      {children}
    </div>
  );
}
