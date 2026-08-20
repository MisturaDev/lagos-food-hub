"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";

export default function NotificationsPage() {
  const isLoggedIn = useAuthGuard();
  const store = useHubStore();
  const { pushToast } = useToast();

  if (!isLoggedIn) return <AuthLoading />;

  const unreadCount = store.notifications.filter((item) => !item.read).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <PageHeader
        title="Notification Center"
        description={`${unreadCount} unread update${unreadCount === 1 ? "" : "s"} from your workspace.`}
        actions={
          store.notifications.length > 0 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                markAllNotificationsRead();
                pushToast("All notifications marked as read.", "info");
              }}
            >
              Mark all read
            </Button>
          ) : null
        }
      />

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
