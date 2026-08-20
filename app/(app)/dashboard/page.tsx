"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { Role } from "@/lib/ui";
import { useAccountName, useActiveRole, useProfile } from "@/lib/use-ui-session";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

type QuickAction = { href: string; label: string; variant: "primary" | "secondary" | "ghost" };

const roleQuickActions: Record<Role, QuickAction[]> = {
  donor: [
    { href: "/donor", label: "Create Donation", variant: "primary" },
    { href: "/matches", label: "View Matches", variant: "secondary" },
    { href: "/choose-role", label: "Switch Role", variant: "ghost" },
    { href: "/profile", label: "Edit Profile", variant: "ghost" },
  ],
  beneficiary: [
    { href: "/beneficiary", label: "Request Food", variant: "primary" },
    { href: "/matches", label: "View Matches", variant: "secondary" },
    { href: "/choose-role", label: "Switch Role", variant: "ghost" },
    { href: "/profile", label: "Edit Profile", variant: "ghost" },
  ],
  volunteer: [
    { href: "/volunteer", label: "View Deliveries", variant: "primary" },
    { href: "/matches", label: "Match Center", variant: "secondary" },
    { href: "/choose-role", label: "Switch Role", variant: "ghost" },
    { href: "/profile", label: "Edit Profile", variant: "ghost" },
  ],
  admin: [
    { href: "/admin", label: "Admin Panel", variant: "primary" },
    { href: "/matches", label: "Match Center", variant: "secondary" },
    { href: "/volunteer", label: "Dispatch Board", variant: "secondary" },
    { href: "/profile", label: "Edit Profile", variant: "ghost" },
  ],
};

export default function DashboardPage() {
  const isLoggedIn = useAuthGuard();
  const activeRole = (useActiveRole() ?? "donor") as Role;
  const accountName = useAccountName();
  const profile = useProfile();
  const store = useHubStore();

  if (!isLoggedIn) return <AuthLoading />;

  const firstName = accountName || "User";
  const titleRole = activeRole.charAt(0).toUpperCase() + activeRole.slice(1);
  const quickActions = roleQuickActions[activeRole];

  const statsByRole: Record<Role, Array<{ label: string; value: string }>> = {
    donor: [
      { label: "Total Donations", value: String(store.donations.length) },
      {
        label: "Active Donations",
        value: String(store.donations.filter((item) => item.status === "pending" || item.status === "approved").length),
      },
      {
        label: "Approved Offers",
        value: String(store.donations.filter((item) => item.status === "approved" || item.status === "matched").length),
      },
    ],
    beneficiary: [
      {
        label: "Active Requests",
        value: String(store.requests.filter((item) => item.status === "pending" || item.status === "approved").length),
      },
      {
        label: "Support Received",
        value: String(store.requests.filter((item) => item.status === "fulfilled" || item.status === "matched").length),
      },
      { label: "Requests Made", value: String(store.requests.length) },
    ],
    volunteer: [
      {
        label: "Completed Deliveries",
        value: String(store.tasks.filter((item) => item.status === "completed").length),
      },
      {
        label: "Active Deliveries",
        value: String(store.tasks.filter((item) => item.status === "in_progress").length),
      },
      {
        label: "Available Tasks",
        value: String(store.tasks.filter((item) => item.status === "available").length),
      },
    ],
    admin: [
      {
        label: "Pending Approvals",
        value: String(store.approvals.filter((item) => item.status === "pending").length),
      },
      {
        label: "Active Volunteers",
        value: String(store.tasks.filter((item) => item.status === "in_progress").length),
      },
      {
        label: "Scheduled Pickups",
        value: String(store.matches.filter((item) => item.status === "Scheduled").length),
      },
    ],
  };

  const activity = store.notifications.slice(0, 5).map((item) => item.title);
  const stats = statsByRole[activeRole];

  const checklist = [
    {
      id: "profile",
      label: "Complete your profile",
      done: Boolean(profile.fullName.trim() && profile.email.trim()),
      href: "/profile",
    },
    {
      id: "role",
      label: "Confirm your active role",
      done: Boolean(activeRole),
      href: "/choose-role",
    },
    {
      id: "first-action",
      label:
        activeRole === "donor"
          ? "Submit your first donation"
          : activeRole === "beneficiary"
            ? "Create your first support request"
            : activeRole === "volunteer"
              ? "Claim your first delivery task"
              : "Review the approval queue",
      done:
        activeRole === "donor"
          ? store.donations.length > 0
          : activeRole === "beneficiary"
            ? store.requests.length > 0
            : activeRole === "volunteer"
              ? store.tasks.some((task) => task.status !== "available")
              : store.approvals.some((item) => item.status !== "pending"),
      href:
        activeRole === "donor"
          ? "/donor"
          : activeRole === "beneficiary"
            ? "/beneficiary"
            : activeRole === "volunteer"
              ? "/volunteer"
              : "/admin",
    },
  ];
  const remaining = checklist.filter((item) => !item.done).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Dashboard</span>
      </p>

      <section className="mt-4 rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-lime-50 p-8 shadow-sm">
        <h1 className="text-3xl font-black tracking-tight text-[#166534] md:text-4xl">
          Welcome back, {firstName}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-slate-700">Active Role: {titleRole}</p>
          <Link
            href="/choose-role"
            className="rounded-full border border-green-200 px-3 py-0.5 text-xs font-semibold text-[#166534] transition hover:bg-green-100"
          >
            Switch role
          </Link>
        </div>
      </section>

      {remaining > 0 ? (
        <section className="mt-4">
          <Card title="Getting started" description={`${remaining} step${remaining === 1 ? "" : "s"} left`}>
            <ul className="space-y-2">
              {checklist.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-green-100 bg-white px-3 py-2 text-sm"
                >
                  <span className={item.done ? "text-slate-500 line-through" : "font-medium text-slate-800"}>
                    {item.label}
                  </span>
                  {item.done ? (
                    <span className="text-xs font-semibold text-[#166534]">Done</span>
                  ) : (
                    <Link href={item.href}>
                      <Button variant="secondary" className="px-3 py-1 text-xs">
                        Continue
                      </Button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      ) : null}

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label} title={item.value} description={item.label}>
            <span className="text-xs text-slate-500">Live demo metric</span>
          </Card>
        ))}
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="max-w-2xl">
          <Card title="Quick Actions">
            <div className="grid gap-2 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link key={action.href + action.label} href={action.href}>
                  <Button variant={action.variant} className="w-full px-3 py-1.5 text-xs">
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
        <div className="max-w-2xl">
          <Card title="Recent Activity" description={`Latest ${titleRole} activity`}>
            {activity.length === 0 ? (
              <EmptyState title="No activity yet" message="Actions across the hub will show up here." />
            ) : (
              <ul className="space-y-2 text-sm text-slate-700">
                {activity.map((item) => (
                  <li key={item} className="rounded-md border border-green-100 bg-green-50 px-3 py-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}
