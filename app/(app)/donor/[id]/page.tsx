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
import { cancelDonation, capitalizeStatus, updateDonation, type DonationStatus } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useRoleGuard } from "@/lib/use-role-guard";

const statusTone: Record<DonationStatus, "neutral" | "success" | "warning"> = {
  pending: "warning",
  approved: "success",
  matched: "success",
  rejected: "neutral",
  completed: "success",
  cancelled: "neutral",
};

export default function DonationDetailPage() {
  const allowed = useRoleGuard(["donor", "admin"]);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const store = useHubStore();
  const { pushToast } = useToast();
  const donation = useMemo(
    () => store.donations.find((item) => item.id === params.id),
    [params.id, store.donations],
  );

  const [form, setForm] = useState({
    foodType: "",
    quantity: "",
    pickupWindow: "",
    location: "",
    contact: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!donation) return;
    setForm({
      foodType: donation.foodType,
      quantity: donation.quantity,
      pickupWindow: donation.pickupWindow,
      location: donation.location,
      contact: donation.contact,
    });
  }, [donation]);

  if (!allowed) return <AuthLoading />;

  if (!donation) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <PageHeader title="Donation not found" description="This offer may have been removed." />
        <Link href="/donor" className="mt-4 inline-flex text-sm font-semibold text-[#166534]">
          Back to donor workspace
        </Link>
      </main>
    );
  }

  const canEdit = donation.status === "pending" || donation.status === "approved";
  const donationId = donation.id;

  function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canEdit) return;
    if (!form.foodType || !form.quantity || !form.pickupWindow || !form.location || !form.contact) {
      setError("Please complete all fields.");
      return;
    }
    updateDonation(donationId, form);
    pushToast("Donation updated.");
    setError("");
  }

  function onCancel() {
    cancelDonation(donationId);
    pushToast("Donation cancelled.", "info");
    router.push("/donor");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <PageHeader
        title={donation.foodType}
        description={`${donation.id} · ${donation.donorName}`}
        actions={<Badge tone={statusTone[donation.status]}>{capitalizeStatus(donation.status)}</Badge>}
      />

      <Card title="Donation details" description="Edit offer details or cancel if no longer available.">
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="foodType"
              label="Food Type"
              value={form.foodType}
              disabled={!canEdit}
              onChange={(e) => setForm((prev) => ({ ...prev, foodType: e.target.value }))}
            />
            <Input
              id="quantity"
              label="Quantity"
              value={form.quantity}
              disabled={!canEdit}
              onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="pickupWindow"
              label="Pickup Window"
              value={form.pickupWindow}
              disabled={!canEdit}
              onChange={(e) => setForm((prev) => ({ ...prev, pickupWindow: e.target.value }))}
            />
            <Input
              id="contact"
              label="Contact"
              value={form.contact}
              disabled={!canEdit}
              onChange={(e) => setForm((prev) => ({ ...prev, contact: e.target.value }))}
            />
          </div>
          <Input
            id="location"
            label="Location"
            value={form.location}
            disabled={!canEdit}
            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
          />
          {error ? (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {canEdit ? (
              <>
                <Button type="submit">Save changes</Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                  Cancel donation
                </Button>
              </>
            ) : null}
            <Link href="/donor">
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
