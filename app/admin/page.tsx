import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

const stats = [
  { label: "Pending Approvals", value: "12" },
  { label: "Active Volunteers", value: "34" },
  { label: "Scheduled Pickups", value: "9" },
];

export default function AdminDashboard() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#0f766e]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Admin Dashboard</span>
      </p>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} title={stat.value} description={stat.label}>
            <Badge tone="neutral">Mock stat</Badge>
          </Card>
        ))}
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <Card title="Recent Activity" description="Latest operations and decisions">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-lg border border-slate-200 px-3 py-2">
              Donor profile in Ikeja submitted for review.
            </li>
            <li className="rounded-lg border border-slate-200 px-3 py-2">
              Volunteer team assigned to Surulere route.
            </li>
            <li className="rounded-lg border border-slate-200 px-3 py-2">
              Beneficiary request marked high urgency.
            </li>
          </ul>
        </Card>
        <Card title="Pending Queue" description="Approvals waiting for admin action">
          <EmptyState
            title="No priority blocks right now"
            message="Your pending queue is clear in this UI snapshot."
          />
        </Card>
      </section>
    </main>
  );
}
