"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { useToast } from "@/components/ui/Toast";
import { claimTask, completeTask, type TaskStatus } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

const columns: Array<{ title: string; status: TaskStatus; tone: "success" | "warning" | "neutral" }> = [
  { title: "Available", status: "available", tone: "success" },
  { title: "In Progress", status: "in_progress", tone: "warning" },
  { title: "Completed", status: "completed", tone: "neutral" },
];

export default function VolunteerDashboard() {
  const isLoggedIn = useAuthGuard();
  const store = useHubStore();
  const { pushToast } = useToast();

  if (!isLoggedIn) return <AuthLoading />;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <PageHeader
        title="Task Board"
        description="Claim pickups, move them through transit, and mark handoffs complete."
      />
      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {columns.map((column) => {
          const tasks = store.tasks.filter((task) => task.status === column.status);
          return (
            <Card
              key={column.title}
              title={column.title}
              description={`${tasks.length} task${tasks.length === 1 ? "" : "s"}`}
            >
              <div className="mb-3">
                <Badge tone={column.tone}>{tasks.length} active</Badge>
              </div>
              {tasks.length === 0 ? (
                <EmptyState
                  title={`No ${column.title.toLowerCase()} tasks`}
                  message="Tasks will appear here as matches are dispatched."
                />
              ) : (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-slate-700"
                    >
                      <p className="font-semibold text-slate-800">{task.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {task.area} · {task.quantity}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {task.status === "available" ? (
                          <Button
                            type="button"
                            className="px-3 py-1.5 text-xs"
                            onClick={() => {
                              claimTask(task.id);
                              pushToast("Task claimed and moved to In Progress.");
                            }}
                          >
                            Claim task
                          </Button>
                        ) : null}
                        {task.status === "in_progress" ? (
                          <Button
                            type="button"
                            className="px-3 py-1.5 text-xs"
                            onClick={() => {
                              completeTask(task.id);
                              pushToast("Task marked completed.");
                            }}
                          >
                            Mark completed
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </section>
    </main>
  );
}
