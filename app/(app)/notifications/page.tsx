"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

export default function NotificationsPage() {
  const isLoggedIn = useAuthGuard();
  const store = useHubStore();

  if (!isLoggedIn) return null;

  const unreadCount = store.notifications.filter((item) => !item.read).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Notifications</span>
      </p>

      <section className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#166534]">Notification Center</h1>
          <p className="mt-1 text-sm text-slate-600">
            {unreadCount} unread update{unreadCount === 1 ? "" : "s"} from your workspace.
          </p>
        </div>
        {store.notifications.length > 0 ? (
          <Button type="button" variant="secondary" onClick={() => markAllNotificationsRead()}>
            Mark all read
          </Button>
        ) : null}
      </section>

      <section className="mt-5">
        <Card title="Latest updates" description="Approvals, matches, and dispatch activity">
          {store.notifications.length === 0 ? (
            <EmptyState
              title="No new notifications"
              message="New alerts, reminders, and activity updates will appear here."
            />
          ) : (
            <div className="space-y-3">
              {store.notifications.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2 ${
                    item.read ? "border-green-100 bg-white" : "border-green-200 bg-green-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={item.tone}>{item.read ? "Read" : item.tone === "neutral" ? "Info" : item.tone}</Badge>
                    {!item.read ? (
                      <Button
                        type="button"
                        variant="ghost"
                        className="px-2 py-1 text-xs"
                        onClick={() => markNotificationRead(item.id)}
                      >
                        Mark read
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}
