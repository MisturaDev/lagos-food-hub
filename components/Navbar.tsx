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
          <Link href="/" className="text-lg font-extrabold tracking-tight text-[#16A34A]">
            Lagos Food Hub
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

