"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Role } from "@/lib/ui";
import { useAccountName, useActiveRole } from "@/lib/use-ui-session";
import { useAuthGuard } from "@/lib/use-auth-guard";

const roleStats: Record<Role, Array<{ label: string; value: string }>> = {
  donor: [
    { label: "Total Donations", value: "18" },
    { label: "Active Donations", value: "3" },
    { label: "Meals Shared", value: "740" },
  ],
  beneficiary: [
    { label: "Active Requests", value: "2" },
    { label: "Support Received", value: "8" },
    { label: "Requests Made", value: "11" },
  ],
  volunteer: [
    { label: "Completed Deliveries", value: "27" },
    { label: "Active Deliveries", value: "4" },
    { label: "Communities Helped", value: "9" },
  ],
  admin: [
    { label: "Pending Approvals", value: "12" },
    { label: "Active Volunteers", value: "34" },
    { label: "Scheduled Pickups", value: "9" },
  ],
};

const roleActivity: Record<Role, string[]> = {
  donor: [
    "New donation created for Surulere pickup.",
    "Donation quantity updated for Yaba route.",
    "Beneficiary match approved for Lekki delivery.",
  ],
  beneficiary: [
    "Support request submitted successfully.",
    "Request status changed to Matched.",
    "Pickup reminder sent for today 4:00 PM.",
  ],
  volunteer: [
    "Delivery task assigned for Ikeja route.",
    "Drop-off completed for community kitchen.",
    "Dispatch update received from donor team.",
  ],
  admin: [
    "Donor profile in Ikeja submitted for review.",
    "Volunteer team assigned to Surulere route.",
    "Beneficiary request marked high urgency.",
  ],
};

type QuickAction = { href: string; label: string; variant: "primary" | "secondary" | "ghost" };

// Each role gets a focused, relevant set of actions.
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

  if (!isLoggedIn) return null;
  const firstName = accountName || "User";
  const titleRole = activeRole.charAt(0).toUpperCase() + activeRole.slice(1);

  const quickActions = roleQuickActions[activeRole];
  const stats = roleStats[activeRole];
  const activity = roleActivity[activeRole];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Dashboard</span>
      </p>

      {/* Welcome banner */}
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

      {/* Stats */}
      {stats.length > 0 && (
        <section className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.label} title={item.value} description={item.label}>
              <span className="text-xs text-slate-500">Role-based metric</span>
            </Card>
          ))}
        </section>
      )}

      {/* Quick Actions + Recent Activity */}
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
            <ul className="space-y-2 text-sm text-slate-700">
              {activity.map((item) => (
                <li key={item} className="rounded-md border border-green-100 bg-green-50 px-3 py-1.5">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </main>
  );
}
