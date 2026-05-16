import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { roleOptions } from "@/lib/ui";

export default function ChooseRolePage() {
  const selectableRoles = roleOptions.filter((role) => role.value !== "admin");

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Choose Role</span>
      </p>

      <section className="mt-4 rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-lime-50 p-8 shadow-sm">
        <Badge tone="success">Workspace Selection</Badge>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#166534] md:text-4xl">
          Choose Your Role for This Session
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-700 md:text-base">
          You only need one account. Select the role you want to work with now, and switch later
          anytime from navigation.
        </p>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {selectableRoles.map((role) => (
          <Card key={role.value} title={role.label}>
            <div className="space-y-3">
              <p className="line-clamp-2 text-sm text-slate-600">{role.description}</p>
              <Link
                href={`/${role.value}`}
                className="inline-flex rounded-md bg-[#16A34A] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#15803D]"
              >
                Continue as {role.label}
              </Link>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
