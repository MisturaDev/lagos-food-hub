"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { useToast } from "@/components/ui/Toast";
import {
  cancelSupportRequest,
  capitalizeStatus,
  updateSupportRequest,
  type RequestStatus,
  type Urgency,
} from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useRoleGuard } from "@/lib/use-role-guard";

const statusTone: Record<RequestStatus, "neutral" | "success" | "warning"> = {
  pending: "warning",
  approved: "success",
  matched: "success",
  rejected: "neutral",
  fulfilled: "success",
  cancelled: "neutral",
};

export default function RequestDetailPage() {
  const allowed = useRoleGuard(["beneficiary", "admin"]);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const store = useHubStore();
  const { pushToast } = useToast();
  const request = useMemo(
    () => store.requests.find((item) => item.id === params.id),
    [params.id, store.requests],
  );

  const [form, setForm] = useState({
    householdSize: "",
    urgency: "" as "" | Urgency,
    dietaryNotes: "",
    pickupArea: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!request) return;
    setForm({
      householdSize: request.householdSize,
      urgency: request.urgency,
      dietaryNotes: request.dietaryNotes,
      pickupArea: request.pickupArea,
    });
  }, [request]);

  if (!allowed) return <AuthLoading />;

  if (!request) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <PageHeader title="Request not found" description="This support request may have been removed." />
        <Link href="/beneficiary" className="mt-4 inline-flex text-sm font-semibold text-[#166534]">
          Back to beneficiary workspace
        </Link>
      </main>
    );
  }

  const canEdit = request.status === "pending" || request.status === "approved";
  const requestId = request.id;

  function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canEdit) return;
    if (!form.householdSize || !form.urgency || !form.pickupArea) {
      setError("Household size, urgency, and pickup area are required.");
      return;
    }
    updateSupportRequest(requestId, {
      householdSize: form.householdSize,
      urgency: form.urgency as Urgency,
      dietaryNotes: form.dietaryNotes,
      pickupArea: form.pickupArea,
    });
    pushToast("Request updated.");
    setError("");
  }

  function onCancel() {
    cancelSupportRequest(requestId);
    pushToast("Request cancelled.", "info");
    router.push("/beneficiary");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <PageHeader
        title={request.pickupArea}
        description={`${request.id} · ${request.beneficiaryName}`}
        actions={<Badge tone={statusTone[request.status]}>{capitalizeStatus(request.status)}</Badge>}
      />

      <Card title="Request details" description="Update need details or cancel if support is no longer required.">
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="householdSize"
              label="Household Size"
              value={form.householdSize}
              disabled={!canEdit}
              onChange={(e) => setForm((prev) => ({ ...prev, householdSize: e.target.value }))}
            />
            <div>
              <label htmlFor="urgency" className="mb-1 block text-sm font-medium text-slate-800">
                Urgency
              </label>
              <select
                id="urgency"
                disabled={!canEdit}
                className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 disabled:bg-slate-50"
                value={form.urgency}
                onChange={(e) => setForm((prev) => ({ ...prev, urgency: e.target.value as "" | Urgency }))}
              >
                <option value="">Select urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <Input
            id="pickupArea"
            label="Pickup Area"
            value={form.pickupArea}
            disabled={!canEdit}
            onChange={(e) => setForm((prev) => ({ ...prev, pickupArea: e.target.value }))}
          />
          <div>
            <label htmlFor="dietaryNotes" className="mb-1 block text-sm font-medium text-slate-800">
              Dietary Notes
            </label>
            <textarea
              id="dietaryNotes"
              disabled={!canEdit}
              className="h-28 w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 disabled:bg-slate-50"
              value={form.dietaryNotes}
              onChange={(e) => setForm((prev) => ({ ...prev, dietaryNotes: e.target.value }))}
            />
          </div>
          {error ? (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {canEdit ? (
              <>
                <Button type="submit">Save changes</Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                  Cancel request
                </Button>
              </>
            ) : null}
            <Link href="/beneficiary">
              <Button type="button" variant="ghost">
                Back
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </main>
  );
}
