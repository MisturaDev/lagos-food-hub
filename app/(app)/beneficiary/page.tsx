"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useAuthGuard } from "@/lib/use-auth-guard";

type RequestForm = {
  householdSize: string;
  urgency: string;
  dietaryNotes: string;
  pickupArea: string;
};

const initialRequest: RequestForm = {
  householdSize: "",
  urgency: "",
  dietaryNotes: "",
  pickupArea: "",
};

export default function BeneficiaryDashboard() {
  const isLoggedIn = useAuthGuard();
  const [form, setForm] = useState<RequestForm>(initialRequest);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isLoggedIn) return null;

  function submitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.householdSize || !form.urgency || !form.pickupArea) {
      setError("Please provide household size, urgency, and pickup area.");
      return;
    }

    setSuccess("Request draft captured successfully in this UI-only flow.");
    setForm(initialRequest);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Beneficiary Dashboard</span>
      </p>
      <section className="mt-4 grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card title="Create Support Request" description="Share your needs for better matching.">
            <form onSubmit={submitRequest} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="householdSize"
                  label="Household Size"
                  placeholder="e.g. 6 people"
                  value={form.householdSize}
                  onChange={(e) => setForm((prev) => ({ ...prev, householdSize: e.target.value }))}
                />
                <div>
                  <label htmlFor="urgency" className="mb-1 block text-sm font-medium text-slate-800">
                    Urgency
                  </label>
                  <select
                    id="urgency"
                    className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                    value={form.urgency}
                    onChange={(e) => setForm((prev) => ({ ...prev, urgency: e.target.value }))}
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <Input
                id="pickupArea"
                label="Preferred Pickup Area"
                placeholder="Your nearest landmark or district"
                value={form.pickupArea}
                onChange={(e) => setForm((prev) => ({ ...prev, pickupArea: e.target.value }))}
              />
              <div>
                <label htmlFor="dietaryNotes" className="mb-1 block text-sm font-medium text-slate-800">
                  Dietary Notes
                </label>
                <textarea
                  id="dietaryNotes"
                  className="h-28 w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                  placeholder="Allergies, dietary restrictions, and preferred options."
                  value={form.dietaryNotes}
                  onChange={(e) => setForm((prev) => ({ ...prev, dietaryNotes: e.target.value }))}
                />
              </div>
              {error ? (
                <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              {success ? (
                <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  {success}
                </p>
              ) : null}
              <Button type="submit">Save Request</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Matching Queue" description="No incoming offers yet.">
            <EmptyState
              title="No available offers right now"
              message="Once donor offers are available, they will show up in your queue."
            />
          </Card>
        </div>
      </section>
    </main>
  );
}

