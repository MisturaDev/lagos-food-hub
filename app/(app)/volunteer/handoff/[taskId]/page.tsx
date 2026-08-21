"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { useHubStore } from "@/lib/use-mock-store";
import { useRoleGuard } from "@/lib/use-role-guard";

export default function HandoffSlipPage() {
  const allowed = useRoleGuard(["volunteer", "admin"]);
  const params = useParams<{ taskId: string }>();
  const store = useHubStore();

  const task = useMemo(
    () => store.tasks.find((item) => item.id === params.taskId),
    [params.taskId, store.tasks],
  );
  const match = useMemo(
    () => (task?.matchId ? store.matches.find((item) => item.id === task.matchId) : null),
    [store.matches, task],
  );

  if (!allowed) return <AuthLoading />;

  if (!task) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <PageHeader title="Handoff slip not found" />
        <Link href="/volunteer" className="mt-4 inline-flex text-sm font-semibold text-[#166534]">
          Back to task board
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 print:px-0 print:py-0">
      <div className="print:hidden">
        <PageHeader
          title="Handoff slip"
          description="Print or save this slip for pickup confirmation."
          actions={
            <Button type="button" onClick={() => window.print()}>
              Print slip
            </Button>
          }
        />
      </div>

      <Card title="Lagos Food Hub · Delivery Handoff">
        <div className="space-y-4 text-sm text-slate-800">
          <div className="grid gap-3 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Task ID:</span> {task.id}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {task.status.replace("_", " ")}
            </p>
            <p>
              <span className="font-semibold">Area:</span> {task.area}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {task.quantity}
            </p>
          </div>

          <div className="rounded-md border border-green-100 bg-green-50 p-3">
            <p className="font-semibold text-[#166534]">{task.title}</p>
            {match ? (
              <>
                <p className="mt-2">Donor: {match.donor}</p>
                <p>Beneficiary: {match.beneficiary}</p>
                <p>Route: {match.route}</p>
                <p>Pickup window: {match.pickupWindow}</p>
              </>
            ) : null}
          </div>

          <div className="grid gap-6 pt-4 sm:grid-cols-2">
            <div className="border-t border-slate-300 pt-8 text-center text-xs text-slate-500">
              Donor / pickup signature
            </div>
            <div className="border-t border-slate-300 pt-8 text-center text-xs text-slate-500">
              Beneficiary / drop-off signature
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-4 print:hidden">
        <Link href="/volunteer">
          <Button variant="ghost">Back to task board</Button>
        </Link>
      </div>
    </main>
  );
}
