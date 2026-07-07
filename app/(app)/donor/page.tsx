"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
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

export default function DonorDashboard() {
  const isLoggedIn = useAuthGuard();
  const [form, setForm] = useState<DonorForm>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  if (!isLoggedIn) return null;

  function submitDonation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.foodType || !form.quantity || !form.pickupWindow || !form.location || !form.contact) {
      setError("Please complete all fields to continue.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenSuccess(true);
      setForm(initialForm);
    }, 800);
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
          <Card title="Status" description="No active donation dispatch yet.">
            <div className="animate-pulse rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-500">
              Waiting for your first submission...
            </div>
          </Card>
        </div>
      </section>

      <Modal open={openSuccess} title="Donation Submitted" onClose={() => setOpenSuccess(false)}>
        <p className="text-sm text-slate-700">
          Your donation offer has been recorded in this UI flow. Backend dispatch is not connected
          yet.
        </p>
      </Modal>
    </main>
  );
}

