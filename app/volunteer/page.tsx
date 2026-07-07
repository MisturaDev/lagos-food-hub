"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuthGuard } from "@/lib/use-auth-guard";

const columns = [
  { title: "Available", tone: "success" as const, count: 2 },
  { title: "In Progress", tone: "warning" as const, count: 1 },
  { title: "Completed", tone: "neutral" as const, count: 0 },
];

export default function VolunteerDashboard() {
  const isLoggedIn = useAuthGuard();
  if (!isLoggedIn) return null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Volunteer Dashboard</span>
      </p>
      <section className="mt-4">
        <h1 className="text-2xl font-black text-[#166534]">Task Board</h1>
        <p className="mt-1 text-sm text-slate-600">
          Coordinate pickup and drop-off assignments with clear workflow states.
        </p>
      </section>
      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {columns.map((column) => (
          <Card
            key={column.title}
            title={column.title}
            description={`${column.count} task${column.count === 1 ? "" : "s"}`}
          >
            <div className="mb-3">
              <Badge tone={column.tone}>{column.count} active</Badge>
            </div>
            {column.title === "Completed" ? (
              <EmptyState
                title="No completed tasks yet"
                message="Completed pickups and deliveries will be listed here."
              />
            ) : (
              <div className="space-y-2">
                <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-slate-700">
                  Surulere pickup - 80 meal packs
                </div>
                {column.title === "Available" ? (
                  <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-slate-700">
                    Yaba dispatch - produce basket collection
                  </div>
                ) : null}
              </div>
            )}
          </Card>
        ))}
      </section>
    </main>
  );
}

