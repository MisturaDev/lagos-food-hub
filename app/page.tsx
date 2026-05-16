import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { roleOptions } from "@/lib/ui";

export default function Home() {
  const publicRoles = roleOptions.filter((role) => role.value !== "admin");

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <section className="rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-amber-50 p-8 shadow-sm md:p-12">
        <Badge tone="success">Community Food Logistics</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-[#166534] md:text-5xl">
          Connecting Surplus Meals to Communities Across Lagos
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-700 md:text-lg">
          Lagos Food Hub helps donors, volunteers, and local communities coordinate food rescue and
          fair distribution with speed and transparency.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">Explore Roles</Button>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-[#166534] md:text-2xl">Choose your role</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {publicRoles.map((role) => (
            <Card key={role.value} title={role.label}>
              <p className="text-sm text-slate-600">{role.description}</p>
              <Link
                href={`/${role.value}`}
                className="mt-3 inline-flex rounded-md border border-green-200 px-3 py-1.5 text-xs font-semibold text-[#16A34A] hover:bg-green-50"
              >
                View {role.label} Dashboard
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-[#166534] md:text-2xl">How it works</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card title="1. Create or log in" description="Pick your role and complete your profile.">
            <p className="text-sm text-slate-600">Donors, beneficiaries, volunteers, and admins use tailored flows.</p>
          </Card>
          <Card title="2. Match and coordinate" description="Share requests and coordinate pickup windows.">
            <p className="text-sm text-slate-600">Teams track status with clear operational visibility.</p>
          </Card>
          <Card title="3. Deliver and report" description="Complete handoff and monitor community impact.">
            <p className="text-sm text-slate-600">Progress snapshots help teams improve weekly planning.</p>
          </Card>
        </div>
      </section>
    </main>
  );
}

