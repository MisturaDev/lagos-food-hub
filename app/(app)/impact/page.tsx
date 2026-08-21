"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { getImpactStats } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

export default function ImpactPage() {
  const isLoggedIn = useAuthGuard();
  const store = useHubStore();
  const stats = getImpactStats(store);

  if (!isLoggedIn) return <AuthLoading />;

  const cards = [
    { label: "Completed handoffs", value: String(stats.completedTasks) },
    { label: "Completed matches", value: String(stats.completedMatches) },
    { label: "Active routes", value: String(stats.activeRoutes) },
    { label: "Open donations", value: String(stats.openDonations) },
    { label: "Open requests", value: String(stats.openRequests) },
    { label: "Areas touched", value: String(stats.areasServed) },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <PageHeader
        title="Impact overview"
        description="Live demo metrics from the local hub store — meals moved, routes active, and areas served."
      />

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} title={card.value} description={card.label}>
            <span className="text-xs text-slate-500">Updated from mock data</span>
          </Card>
        ))}
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Pipeline" description="Current volume across the hub">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
              Total donations: <span className="font-semibold">{stats.totalDonations}</span>
            </li>
            <li className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
              Total requests: <span className="font-semibold">{stats.totalRequests}</span>
            </li>
            <li className="rounded-md border border-green-100 bg-green-50 px-3 py-2">
              Total matches: <span className="font-semibold">{stats.totalMatches}</span>
            </li>
          </ul>
        </Card>
        <Card title="Keep coordinating" description="Jump back into the field workflows">
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/matches" className="rounded-md border border-green-200 px-3 py-2 font-semibold text-[#166534]">
              Match Center
            </Link>
            <Link href="/volunteer" className="rounded-md border border-green-200 px-3 py-2 font-semibold text-[#166534]">
              Volunteer board
            </Link>
            <Link href="/dashboard" className="rounded-md border border-green-200 px-3 py-2 font-semibold text-[#166534]">
              Dashboard
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
