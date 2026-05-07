"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/ui";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-teal-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto w-full max-w-6xl px-4 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-[#0f766e]">
            Lagos Food Hub
          </Link>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md border border-teal-300 px-3 py-1.5 text-sm font-semibold text-[#0f766e] md:hidden"
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
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] ${isActive ? "bg-teal-100 text-[#115e59]" : "text-[#0f766e] hover:bg-teal-50"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="rounded-md border border-[#0f766e] px-3 py-1.5 text-sm font-medium text-[#0f766e] transition hover:bg-teal-50"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#0f766e] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#115e59]"
            >
              Register
            </Link>
          </div>
        </div>

        {open ? (
          <div id="mobile-menu" className="mt-3 space-y-2 border-t border-teal-100 pt-3 md:hidden">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-teal-100 text-[#115e59]" : "text-[#0f766e] hover:bg-teal-50"}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex gap-2 pt-1">
              <Link
                href="/login"
                className="w-full rounded-md border border-[#0f766e] px-3 py-2 text-center text-sm font-medium text-[#0f766e]"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full rounded-md bg-[#0f766e] px-3 py-2 text-center text-sm font-semibold text-white"
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
