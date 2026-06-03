"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Role } from "@/lib/ui";
import { useAccountName, useActiveRole } from "@/lib/use-ui-session";

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
  admin: [],
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
  admin: [],
};

const roleActionHref: Record<Role, string> = {
  donor: "/donor",
  beneficiary: "/beneficiary",
  volunteer: "/volunteer",
  admin: "/admin",
};

export default function DashboardPage() {
  const activeRole = (useActiveRole() ?? "donor") as Role;
  const accountName = useAccountName();
  const firstName = accountName || "User";

  const titleRole = activeRole[0].toUpperCase() + activeRole.slice(1);
  const actionLabel =
    activeRole === "donor" ? "Create Donation" : activeRole === "beneficiary" ? "Request Food" : "View Deliveries";

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
        <p className="mt-2 text-sm font-semibold text-slate-700 md:text-base">Active Role: {titleRole}</p>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        {roleStats[activeRole].map((item) => (
          <Card key={item.label} title={item.value} description={item.label}>
            <span className="text-xs text-slate-500">Role-based metric</span>
          </Card>
        ))}
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="max-w-2xl">
          <Card title="Quick Actions">
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href={roleActionHref[activeRole]}>
                <Button className="w-full px-3 py-1.5 text-xs">{actionLabel}</Button>
              </Link>
              <Link href="/matches">
                <Button variant="secondary" className="w-full px-3 py-1.5 text-xs">
                  Find Matches
                </Button>
              </Link>
              <Link href="/beneficiary">
                <Button variant="secondary" className="w-full px-3 py-1.5 text-xs">
                  Request Food
                </Button>
              </Link>
              <Link href="/volunteer">
                <Button variant="secondary" className="w-full px-3 py-1.5 text-xs">
                  View Deliveries
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="w-full px-3 py-1.5 text-xs">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="max-w-2xl">
          <Card title="Recent Activity" description="Recent donations, requests, and deliveries">
            <ul className="space-y-2 text-sm text-slate-700">
              {roleActivity[activeRole].map((item) => (
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
