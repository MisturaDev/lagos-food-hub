import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { roleOptions } from "@/lib/ui";

const liveStats = [
  { label: "Meals routed this week", value: "2,840" },
  { label: "Active Lagos areas", value: "18" },
  { label: "Pickup windows open", value: "27" },
];

const hubSignals = [
  "Same-day donor to beneficiary matching",
  "Volunteer dispatch by pickup window and area",
  "Clear handoff status for every route",
];

const impactAreas = ["Surulere", "Yaba", "Ikeja", "Lekki", "Ajah", "Agege"];

const footerLinks = [
  { label: "Match Center", href: "/matches" },
  { label: "Donor Workspace", href: "/donor" },
  { label: "Beneficiary Workspace", href: "/beneficiary" },
  { label: "Volunteer Workspace", href: "/volunteer" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function Home() {
  const publicRoles = roleOptions.filter((role) => role.value !== "admin");

  return (
    <>
      <main className="w-full">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="border-b border-green-100 bg-[#f7faf8]">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-14">
            <div>
              <Badge tone="success">Community Food Logistics</Badge>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-[#12312a] md:text-6xl">
                Move surplus food where Lagos needs it most.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
                Lagos Food Hub helps donors, volunteers, and community partners coordinate food rescue,
                pickup windows, route handoffs, and fair distribution from one practical workspace.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/register">
                  <Button>Start Coordinating</Button>
                </Link>
                <Link href="/matches">
                  <Button variant="secondary">View Match Center</Button>
                </Link>
                {/* Changed from /choose-role (requires auth) to /register for guests */}
                <Link href="/register">
                  <Button variant="ghost">Join the Hub</Button>
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {liveStats.map((stat) => (
                  <div key={stat.label} className="rounded-md border border-green-100 bg-white px-4 py-3 shadow-sm">
                    <p className="text-2xl font-black text-[#166534]">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-green-100 bg-white shadow-sm">
              <Image
                src="/lagos-food-map.svg"
                alt="Illustrated Lagos food rescue route map"
                width={780}
                height={620}
                priority
                className="h-auto w-full"
              />
              <div className="border-t border-green-100 bg-white p-4">
                <p className="text-sm font-bold text-[#166534]">Today&apos;s routing focus</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {impactAreas.map((area) => (
                    <span key={area} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Built for field work ─────────────────────────────────────── */}
        <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#12312a]">Built for real field work</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              The hub keeps the everyday details visible: what food is available, who needs it, who can move it,
              and what has already been handed off.
            </p>
            <ul className="mt-5 space-y-3">
              {hubSignals.map((signal) => (
                <li key={signal} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#16A34A]" aria-hidden="true" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {publicRoles.map((role) => (
              <Card key={role.value} title={role.label}>
                <p className="text-sm leading-6 text-slate-600">{role.description}</p>
                <Link
                  href={`/${role.value}`}
                  className="mt-4 inline-flex rounded-md border border-green-200 px-3 py-1.5 text-xs font-semibold text-[#166534] hover:bg-green-50"
                >
                  Open workspace
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section className="border-y border-green-100 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
            <Card title="1. Capture supply" description="Donors log meal type, quantity, pickup time, and location.">
              <p className="text-sm text-slate-600">Offers become visible in the match center for fast review.</p>
            </Card>
            <Card title="2. Match need" description="Beneficiary requests are filtered by area, urgency, and capacity.">
              <p className="text-sm text-slate-600">Coordinators can see gaps before food or time is wasted.</p>
            </Card>
            <Card title="3. Dispatch route" description="Volunteers track pickup, transit, and completed handoff states.">
              <p className="text-sm text-slate-600">Every route has a clear next action and owner.</p>
            </Card>
          </div>
        </section>

        {/* ── CTA banner ───────────────────────────────────────────────── */}
        <section className="bg-[#166534]">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-2xl font-black text-white">Ready to reduce food waste in Lagos?</h2>
              <p className="mt-2 text-sm leading-6 text-green-200">
                Join donors, volunteers, and community partners already coordinating through the hub.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/register">
                <Button className="bg-white text-[#166534] hover:bg-green-50">Get Started</Button>
              </Link>
              <Link href="/matches">
                <Button variant="ghost" className="border border-green-300 text-white hover:bg-green-700">
                  View Matches
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-green-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#166534] text-lg font-black text-white shadow-sm">
                  F
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#F59E0B]" />
                </span>
                <span className="text-base font-extrabold tracking-tight text-[#166534]">Lagos Food Hub</span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                A community-driven food rescue network connecting surplus food to communities across Lagos.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick links</p>
              <ul className="mt-3 space-y-2">
                {footerLinks.slice(0, 4).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-600 transition hover:text-[#16A34A]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account</p>
              <ul className="mt-3 space-y-2">
                {footerLinks.slice(4).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-600 transition hover:text-[#16A34A]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-green-100 pt-6 sm:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Lagos Food Hub. All rights reserved.
            </p>
            <p className="text-xs text-slate-400">Food Rescue Network &mdash; Lagos, Nigeria</p>
          </div>
        </div>
      </footer>
    </>
  );
}
