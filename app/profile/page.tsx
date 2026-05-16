"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { getProfile, setAccountName, setProfile } from "@/lib/ui-session";
import { useActiveRole } from "@/lib/use-ui-session";

export default function ProfilePage() {
  const activeRole = useActiveRole();
  const [form, setForm] = useState(() => getProfile());
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const completion = useMemo(() => {
    const fields = [form.firstName, form.lastName, form.email, form.phone];
    const filled = fields.filter((field) => field.trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!form.firstName.trim() || !form.email.trim()) {
      setError("First name and email are required.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setProfile(form);
      setAccountName(form.firstName);
      setStatus("Profile saved successfully.");
      setLoading(false);
    }, 500);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Profile</span>
      </p>

      <section className="mt-4 grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card title="Account Profile" description="Update your account details for this workspace.">
            <form onSubmit={onSave} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  id="phone"
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              {error ? (
                <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}
              {status ? (
                <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                  {status}
                </p>
              ) : null}
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Session" description="Current workspace status">
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Active Role:{" "}
                <span className="font-semibold">
                  {activeRole
                    ? activeRole[0].toUpperCase() + activeRole.slice(1)
                    : "Not selected"}
                </span>
              </p>
              <Link href="/dashboard" className="text-sm font-semibold text-[#16A34A] hover:underline">
                Switch role from dashboard
              </Link>
            </div>
          </Card>
          <Card title="Profile Completion" description="Complete your details for better coordination">
            <div className="space-y-2">
              <Badge tone={completion >= 75 ? "success" : "warning"}>{completion}% Complete</Badge>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-[#16A34A] transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
