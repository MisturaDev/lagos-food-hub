"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { capitalizeStatus, createDonation, type DonationStatus } from "@/lib/mock-store";
import { useAccountName } from "@/lib/use-ui-session";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

type DonorForm = {
  foodType: string;
  quantity: string;
  pickupWindow: string;
  location: string;
  contact: string;
};

const initialForm: DonorForm = {
  foodType: "",
  quantity: "",
  pickupWindow: "",
  location: "",
  contact: "",
};

const statusTone: Record<DonationStatus, "neutral" | "success" | "warning"> = {
  pending: "warning",
  approved: "success",
  matched: "success",
  rejected: "neutral",
  completed: "success",
};

export default function DonorDashboard() {
  const isLoggedIn = useAuthGuard();
  const accountName = useAccountName();
  const store = useHubStore();
  const [form, setForm] = useState<DonorForm>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  if (!isLoggedIn) return null;

  const myDonations = store.donations;
  const activeCount = myDonations.filter((item) => item.status === "pending" || item.status === "approved").length;

  function submitDonation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.foodType || !form.quantity || !form.pickupWindow || !form.location || !form.contact) {
      setError("Please complete all fields to continue.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      createDonation({
        ...form,
        donorName: accountName || "Donor",
      });
      setLoading(false);
      setOpenSuccess(true);
      setForm(initialForm);
    }, 400);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Donor Dashboard</span>
      </p>

      <section className="mt-4 grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card
            title="Create Donation Offer"
            description="Share food details so volunteers can coordinate pickup."
          >
            <form onSubmit={submitDonation} className="space-y-4" aria-live="polite">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="foodType"
                  label="Food Type"
                  placeholder="Cooked meals, rice packs, produce..."
                  value={form.foodType}
                  onChange={(e) => setForm((prev) => ({ ...prev, foodType: e.target.value }))}
                />
                <Input
                  id="quantity"
                  label="Quantity"
                  placeholder="e.g. 120 meal packs"
                  value={form.quantity}
                  onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="pickupWindow"
                  label="Pickup Time Window"
                  placeholder="Today, 4:00 PM - 6:00 PM"
                  value={form.pickupWindow}
                  onChange={(e) => setForm((prev) => ({ ...prev, pickupWindow: e.target.value }))}
                />
                <Input
                  id="contact"
                  label="Contact Number"
                  placeholder="+234..."
                  value={form.contact}
                  onChange={(e) => setForm((prev) => ({ ...prev, contact: e.target.value }))}
                />
              </div>
              <Input
                id="location"
                label="Pickup Location"
                placeholder="Street, area, and landmark"
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              />
              {error ? (
                <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting offer..." : "Submit Donation"}
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Tips" description="Make matching faster with clear details.">
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Include exact quantity and packaging details.</li>
              <li>Give a reliable pickup contact number.</li>
              <li>Mention storage needs if food is perishable.</li>
            </ul>
          </Card>
          <Card title="Status" description={`${activeCount} active donation${activeCount === 1 ? "" : "s"}`}>
            <p className="text-sm text-slate-600">
              {activeCount > 0
                ? "Offers are visible to admins for approval and matching."
                : "Submit your first donation to start coordinating pickup."}
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-5">
        <Card title="My Donations" description="Offers you have submitted in this demo store.">
          {myDonations.length === 0 ? (
            <EmptyState
              title="No donations yet"
              message="Your submitted offers will appear here with live status updates."
            />
          ) : (
            <div className="space-y-3">
              {myDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="rounded-lg border border-green-100 bg-white px-4 py-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{donation.foodType}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {donation.quantity} · {donation.location}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{donation.pickupWindow}</p>
                    </div>
                    <Badge tone={statusTone[donation.status]}>{capitalizeStatus(donation.status)}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <Modal open={openSuccess} title="Donation Submitted" onClose={() => setOpenSuccess(false)}>
        <p className="text-sm text-slate-700">
          Your donation offer was saved locally and added to the admin approval queue.
        </p>
      </Modal>
    </main>
  );
}
