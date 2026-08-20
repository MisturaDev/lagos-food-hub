import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ToastProvider } from "@/components/ui/Toast";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen text-slate-900">
        <Navbar />
        <div className="md:flex">
          <Sidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
