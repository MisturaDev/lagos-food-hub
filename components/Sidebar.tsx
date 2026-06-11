"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ACCOUNT_NAME_KEY, ACTIVE_ROLE_KEY, PROFILE_KEY } from "@/lib/ui-session";

type IconName =
  | "home"
  | "dashboard"
  | "matches"
  | "bell"
  | "donor"
  | "beneficiary"
  | "volunteer"
  | "profile";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
};

const mainNav: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/matches", label: "Match Center", icon: "matches" },
  { href: "/notifications", label: "Notifications", icon: "bell" },
];

const workspaces: NavItem[] = [
  { href: "/donor", label: "Donor", icon: "donor" },
  { href: "/beneficiary", label: "Beneficiary", icon: "beneficiary" },
  { href: "/volunteer", label: "Volunteer", icon: "volunteer" },
];

const accountNav: NavItem[] = [{ href: "/profile", label: "Profile", icon: "profile" }];

function SidebarIcon({ name }: { name: IconName }) {
  const common = "h-4 w-4";

  if (name === "home") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 11 12 4l9 7" />
        <path d="M5 10v10h14V10" />
      </svg>
    );
  }

  if (name === "dashboard") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
      </svg>
    );
  }

  if (name === "matches") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M7 7h10M7 12h7M7 17h10" />
        <path d="m17 10 3 3-3 3" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
        <path d="M10 17a2 2 0 0 0 4 0" />
      </svg>
    );
  }

  if (name === "donor") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="M7 8h10v10H7z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
    );
  }

  if (name === "beneficiary") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
      </svg>
    );
  }

  if (name === "volunteer") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 16 3 14l5-5 4 4 4-4 5 5-2 2" />
        <path d="M8 13v7M16 13v7" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function NavSection({ title, items }: { title?: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div>
      {title ? (
        <p className="mb-2 hidden text-xs font-semibold uppercase tracking-wide text-slate-500 md:block">{title}</p>
      ) : null}
      <div className="flex gap-2 overflow-x-auto md:block md:space-y-1 md:overflow-visible">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-green-100 text-[#166534]"
                  : "text-slate-700 hover:bg-green-50 hover:text-[#166534]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <SidebarIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar() {
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
    <aside className="border-b border-green-100 bg-white px-4 py-3 md:sticky md:top-[65px] md:min-h-[calc(100vh-65px)] md:w-72 md:shrink-0 md:border-b-0 md:border-r md:p-4">
      <nav className="flex gap-3 overflow-x-auto md:block md:space-y-6 md:overflow-visible" aria-label="Sidebar navigation">
        <NavSection items={mainNav} />
        <NavSection title="Workspaces" items={workspaces} />
        <NavSection title="Account" items={accountNav} />
      </nav>

      <div className="mt-6 hidden border-t border-green-100 pt-4 md:block">
        <div className="rounded-md border border-green-100 bg-green-50 p-3">
          <p className="text-xs font-semibold text-[#166534]">Food Rescue Network</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">Coordinate supply, need, and dispatch from one hub.</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 w-full rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
