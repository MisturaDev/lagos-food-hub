"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuthGuard } from "@/lib/use-auth-guard";

const notifications = [
  { id: 1, title: "Donation match found", time: "5 mins ago", tone: "success" as const },
  { id: 2, title: "Volunteer task updated", time: "21 mins ago", tone: "neutral" as const },
  { id: 3, title: "Reminder: Complete profile", time: "1 hour ago", tone: "warning" as const },
];

export default function NotificationsPage() {
  const isLoggedIn = useAuthGuard();
  if (!isLoggedIn) return null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Notifications</span>
      </p>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Notification Center" description="Latest updates from your workspace">
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md border border-green-100 bg-white px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                  <Badge tone={item.tone}>{item.tone === "neutral" ? "Info" : item.tone}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Empty State" description="For users with no updates">
          <EmptyState
            title="No new notifications"
            message="New alerts, reminders, and activity updates will appear here."
          />
        </Card>
      </section>
    </main>
  );
}
