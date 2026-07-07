"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Role, roleOptions } from "@/lib/ui";
import { setActiveRole } from "@/lib/ui-session";
import { useActiveRole } from "@/lib/use-ui-session";
import { useAuthGuard } from "@/lib/use-auth-guard";

const roleIcons: Record<Role, React.ReactNode> = {
  donor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M7 8h10v10H7z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  beneficiary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
      <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
    </svg>
  ),
  volunteer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
      <path d="M5 16 3 14l5-5 4 4 4-4 5 5-2 2" />
      <path d="M8 13v7M16 13v7" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
    </svg>
  ),
};

const publicRoles = roleOptions.filter((r) => r.value !== "admin");

export default function ChooseRolePage() {
  const isLoggedIn = useAuthGuard();
  const router = useRouter();
  const currentRole = useActiveRole();
  const [selected, setSelected] = useState<Role>(currentRole ?? "donor");
  const [saving, setSaving] = useState(false);

  if (!isLoggedIn) return null;

  function onConfirm() {
    setSaving(true);
    setActiveRole(selected);
    // Small delay so the button feedback is visible before navigation.
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Choose Role</span>
      </p>

      <section className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight text-[#12312a]">What's your role?</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Pick the role that best describes how you participate in the hub. You can switch later from
          your profile.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Role options">
        {publicRoles.map((role) => {
          const isSelected = selected === role.value;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => setSelected(role.value)}
              aria-pressed={isSelected}
              className={`flex flex-col gap-3 rounded-xl border-2 p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-[#16A34A] bg-green-50 shadow-sm"
                  : "border-green-100 bg-white hover:border-green-300 hover:bg-green-50/50"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  isSelected ? "bg-[#16A34A] text-white" : "bg-green-100 text-[#166534]"
                }`}
              >
                {roleIcons[role.value]}
              </span>

              <span>
                <span className="block text-base font-bold text-[#12312a]">{role.label}</span>
                <span className="mt-1 block text-sm leading-5 text-slate-600">{role.description}</span>
              </span>

              {isSelected && (
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={onConfirm} disabled={saving}>
          {saving ? "Saving..." : `Continue as ${selected.charAt(0).toUpperCase() + selected.slice(1)}`}
        </Button>
        <Link href="/dashboard">
          <Button variant="ghost">Skip for now</Button>
        </Link>
      </div>
    </main>
  );
}
