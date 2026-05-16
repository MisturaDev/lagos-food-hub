"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/ui";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-green-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto w-full max-w-6xl px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link href="/" className="block">
            <p className="text-lg font-extrabold tracking-tight text-[#16A34A]">Lagos Food Hub</p>
            <p className="text-xs text-slate-500">Food Rescue Network</p>
          </Link>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md border border-green-300 px-3 py-1.5 text-sm font-semibold text-[#16A34A] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] ${isActive ? "bg-green-100 text-[#15803D]" : "text-[#16A34A] hover:bg-green-50"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/notifications"
              aria-label="Notifications"
              className="px-1 py-1 text-[#16A34A] transition hover:text-[#15803D]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M10 17a2 2 0 0 0 4 0" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-[#16A34A] px-3 py-1.5 text-sm font-medium text-[#16A34A] transition hover:bg-green-50"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#16A34A] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#15803D]"
            >
              Register
            </Link>
          </div>
        </div>

        {open ? (
          <div id="mobile-menu" className="mt-3 space-y-2 border-t border-green-100 pt-3 md:hidden">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-green-100 text-[#15803D]" : "text-[#16A34A] hover:bg-green-50"}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex gap-2 pt-1">
              <Link
                href="/notifications"
                className="w-full px-3 py-2 text-center text-sm font-medium text-[#16A34A] transition hover:text-[#15803D]"
                onClick={() => setOpen(false)}
              >
                Notifications
              </Link>
            </div>
            <div className="flex gap-2 pt-1">
              <Link
                href="/login"
                className="w-full rounded-md border border-[#16A34A] px-3 py-2 text-center text-sm font-medium text-[#16A34A]"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full rounded-md bg-[#16A34A] px-3 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

