"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useAuthGuard } from "@/lib/use-auth-guard";

type MatchStatus = "Ready" | "Needs volunteer" | "Scheduled";
type Urgency = "High" | "Medium" | "Low";

type FoodMatch = {
  id: string;
  donor: string;
  food: string;
  quantity: string;
  area: string;
  pickupWindow: string;
  beneficiary: string;
  urgency: Urgency;
  status: MatchStatus;
  route: string;
};

const matches: FoodMatch[] = [
  {
    id: "LFH-1024",
    donor: "Mainland Kitchen",
    food: "Cooked jollof rice packs",
    quantity: "120 meals",
    area: "Surulere",
    pickupWindow: "Today, 4:00 PM - 6:00 PM",
    beneficiary: "Aguda Community Pantry",
    urgency: "High",
    status: "Needs volunteer",
    route: "Surulere -> Aguda",
  },
  {
    id: "LFH-1025",
    donor: "Yaba Grocers",
    food: "Fresh produce baskets",
    quantity: "35 baskets",
    area: "Yaba",
    pickupWindow: "Tomorrow, 9:00 AM - 11:00 AM",
    beneficiary: "Makoko Women Collective",
    urgency: "Medium",
    status: "Ready",
    route: "Yaba -> Makoko",
  },
  {
    id: "LFH-1026",
    donor: "Lekki Events",
    food: "Packaged pastries and drinks",
    quantity: "80 packs",
    area: "Lekki",
    pickupWindow: "Friday, 2:00 PM - 3:30 PM",
    beneficiary: "Ajah Youth Centre",
    urgency: "Low",
    status: "Scheduled",
    route: "Lekki -> Ajah",
  },
  {
    id: "LFH-1027",
    donor: "Ikeja Canteen",
    food: "Beans, rice, and stew bowls",
    quantity: "95 meals",
    area: "Ikeja",
    pickupWindow: "Today, 5:30 PM - 7:00 PM",
    beneficiary: "Agege Relief Desk",
    urgency: "High",
    status: "Ready",
    route: "Ikeja -> Agege",
  },
];

const areas = ["All areas", ...Array.from(new Set(matches.map((match) => match.area)))];
const statuses: Array<"All statuses" | MatchStatus> = ["All statuses", "Ready", "Needs volunteer", "Scheduled"];

const urgencyTone: Record<Urgency, "neutral" | "success" | "warning"> = {
  High: "warning",
  Medium: "success",
  Low: "neutral",
};

const statusTone: Record<MatchStatus, "neutral" | "success" | "warning"> = {
  Ready: "success",
  "Needs volunteer": "warning",
  Scheduled: "neutral",
};

export default function MatchesPage() {
  const isLoggedIn = useAuthGuard();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All areas");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All statuses");
  const [selectedMatch, setSelectedMatch] = useState<FoodMatch | null>(null);

  if (!isLoggedIn) return null;

  const filteredMatches = useMemo(() => {
    const search = query.trim().toLowerCase();

    return matches.filter((match) => {
      const matchesSearch =
        !search ||
        [match.id, match.donor, match.food, match.beneficiary, match.area, match.route]
          .join(" ")
          .toLowerCase()
          .includes(search);
      const matchesArea = area === "All areas" || match.area === area;
      const matchesStatus = status === "All statuses" || match.status === status;

      return matchesSearch && matchesArea && matchesStatus;
    });
  }, [area, query, status]);

  const highUrgencyCount = matches.filter((match) => match.urgency === "High").length;
  const volunteerNeededCount = matches.filter((match) => match.status === "Needs volunteer").length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/" className="hover:text-[#16A34A]">
          Home
        </Link>{" "}
        / <span className="font-semibold text-slate-700">Match Center</span>
      </p>

      <section className="mt-4">
        <h1 className="text-3xl font-black tracking-tight text-[#166534] md:text-4xl">Food Match Center</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
          Live donation offers, beneficiary needs, and volunteer dispatch status in one queue.
        </p>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <Card title={String(matches.length)} description="Open matches">
          <Badge tone="success">Citywide queue</Badge>
        </Card>
        <Card title={String(highUrgencyCount)} description="High urgency">
          <Badge tone="warning">Needs attention</Badge>
        </Card>
        <Card title={String(volunteerNeededCount)} description="Volunteer gaps">
          <Badge tone="neutral">Dispatch planning</Badge>
        </Card>
      </section>

      <section className="mt-5 rounded-xl border border-green-100 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
          <Input
            id="matchSearch"
            label="Search"
            placeholder="Search donor, area, food, or route"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div>
            <label htmlFor="areaFilter" className="mb-1 block text-sm font-medium text-slate-800">
              Area
            </label>
            <select
              id="areaFilter"
              className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            >
              {areas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="statusFilter" className="mb-1 block text-sm font-medium text-slate-800">
              Status
            </label>
            <select
              id="statusFilter"
              className="w-full rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:ring-2 focus-visible:ring-[#16A34A]"
              value={status}
              onChange={(event) => setStatus(event.target.value as (typeof statuses)[number])}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        {filteredMatches.map((match) => (
          <Card key={match.id} title={match.food} description={`${match.quantity} from ${match.donor}`}>
            <div className="flex flex-wrap gap-2">
              <Badge tone={urgencyTone[match.urgency]}>{match.urgency} urgency</Badge>
              <Badge tone={statusTone[match.status]}>{match.status}</Badge>
            </div>
            <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-900">Beneficiary</dt>
                <dd>{match.beneficiary}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Pickup</dt>
                <dd>{match.pickupWindow}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Area</dt>
                <dd>{match.area}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Route</dt>
                <dd>{match.route}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button type="button" onClick={() => setSelectedMatch(match)}>
                Coordinate Match
              </Button>
              <Link
                href="/volunteer"
                className="rounded-md border border-[#16A34A] px-4 py-2 text-sm font-semibold text-[#16A34A] transition hover:bg-[#DCFCE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
              >
                Dispatch Board
              </Link>
            </div>
          </Card>
        ))}
      </section>

      {filteredMatches.length === 0 ? (
        <section className="mt-5 rounded-xl border border-green-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No matches found for the current filters.
        </section>
      ) : null}

      <Modal open={Boolean(selectedMatch)} title="Coordinate Match" onClose={() => setSelectedMatch(null)}>
        {selectedMatch ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">{selectedMatch.id}</span> is ready for route planning.
            </p>
            <div className="rounded-lg border border-green-100 bg-green-50 p-3">
              <p className="font-semibold text-[#166534]">{selectedMatch.route}</p>
              <p className="mt-1">{selectedMatch.pickupWindow}</p>
            </div>
            <Button type="button" className="w-full" onClick={() => setSelectedMatch(null)}>
              Mark Coordination Started
            </Button>
          </div>
        ) : null}
      </Modal>
    </main>
  );
}
