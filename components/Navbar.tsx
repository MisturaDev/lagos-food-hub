"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3" aria-label="Top bar">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#166534] text-xl font-black text-white shadow-sm">
            F
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#F59E0B]" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold tracking-tight text-[#166534]">
              Lagos Food Hub
            </span>
            <span className="block truncate text-xs text-slate-500">Food Rescue Network</span>
          </span>
        </Link>

        <div className="hidden min-w-0 max-w-md flex-1 items-center rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm lg:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 text-slate-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Search donors, areas, matches..."
            className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            aria-label="Search"
          />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-md border border-green-200 px-3 py-2 text-sm font-semibold text-[#166534] transition hover:bg-green-50 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-[#16A34A] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#15803D]"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
