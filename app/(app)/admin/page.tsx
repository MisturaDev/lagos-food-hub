"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { decideApproval } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

export default function AdminDashboard() {
  const isLoggedIn = useAuthGuard();
  const store = useHubStore();

  if (!isLoggedIn) return null;

  const pendingApprovals = store.approvals.filter((item) => item.status === "pending");
  const activeVolunteers = store.tasks.filter((task) => task.status === "in_progress").length;
  const scheduledPickups = store.matches.filter((match) => match.status === "Scheduled").length;
  const recentActivity = store.notifications.slice(0, 5);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Admin Dashboard</span>
      </p>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <Card title={String(pendingApprovals.length)} description="Pending Approvals">
          <Badge tone="warning">Needs review</Badge>
        </Card>
        <Card title={String(activeVolunteers)} description="Active Volunteers">
          <Badge tone="success">In transit</Badge>
        </Card>
        <Card title={String(scheduledPickups)} description="Scheduled Pickups">
          <Badge tone="neutral">Dispatch</Badge>
        </Card>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Pending Queue" description="Approve or reject incoming offers and requests">
          {pendingApprovals.length === 0 ? (
            <EmptyState
              title="No priority blocks right now"
              message="New donation offers and support requests will appear here."
            />
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 px-3 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                    </div>
                    <Badge tone="warning">{item.kind}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      className="px-3 py-1.5 text-xs"
                      onClick={() => decideApproval(item.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="px-3 py-1.5 text-xs"
                      onClick={() => decideApproval(item.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Recent Activity" description="Latest operations across the hub">
          {recentActivity.length === 0 ? (
            <EmptyState title="No activity yet" message="Approvals and task updates will show up here." />
          ) : (
            <ul className="space-y-2 text-sm text-slate-700">
              {recentActivity.map((item) => (
                <li key={item.id} className="rounded-lg border border-slate-200 px-3 py-2">
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </main>
  );
}
