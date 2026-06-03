"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ACCOUNT_NAME_KEY, ACTIVE_ROLE_KEY, PROFILE_KEY } from "@/lib/ui-session";

const mainNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/matches", label: "Match Center" },
  { href: "/notifications", label: "Notifications" },
];

const workspaces = [
  { href: "/donor", label: "Donor" },
  { href: "/beneficiary", label: "Beneficiary" },
  { href: "/volunteer", label: "Volunteer" },
];

const accountNav = [
  { href: "/profile", label: "Profile" },
  { href: "/profile", label: "Security" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function onLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCOUNT_NAME_KEY);
      localStorage.removeItem(ACTIVE_ROLE_KEY);
      localStorage.removeItem(PROFILE_KEY);
    }
    router.push("/login");
  }

  return (
    <aside className="hidden w-72 shrink-0 border-r border-green-100 bg-white p-4 md:flex md:min-h-screen md:flex-col">
      <nav className="space-y-5" aria-label="Sidebar navigation">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Main</p>
          <div className="space-y-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-green-100 text-[#166534]" : "text-slate-700 hover:bg-green-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Workspaces</p>
          <div className="space-y-1">
            {workspaces.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-green-100 text-[#166534]" : "text-slate-700 hover:bg-green-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Account</p>
          <div className="space-y-1">
            {accountNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-green-100 text-[#166534]" : "text-slate-700 hover:bg-green-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="mt-auto border-t border-green-100 pt-4">
        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded-md border border-red-300 bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
