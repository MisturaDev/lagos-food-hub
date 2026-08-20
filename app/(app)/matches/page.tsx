"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthLoading } from "@/components/ui/AuthLoading";
import { useToast } from "@/components/ui/Toast";
import { updateMatchStatus, type FoodMatch, type MatchStatus, type Urgency } from "@/lib/mock-store";
import { useHubStore } from "@/lib/use-mock-store";
import { useAuthGuard } from "@/lib/use-auth-guard";

const urgencyTone: Record<Urgency, "neutral" | "success" | "warning"> = {
  High: "warning",
  Medium: "success",
  Low: "neutral",
};

const statusTone: Record<MatchStatus, "neutral" | "success" | "warning"> = {
  Ready: "success",
  "Needs volunteer": "warning",
  Scheduled: "neutral",
  Completed: "success",
};

const statuses: Array<"All statuses" | MatchStatus> = [
  "All statuses",
  "Ready",
  "Needs volunteer",
  "Scheduled",
  "Completed",
];

export default function MatchesPage() {
  const isLoggedIn = useAuthGuard();
  const store = useHubStore();
  const { pushToast } = useToast();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All areas");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All statuses");
  const [selectedMatch, setSelectedMatch] = useState<FoodMatch | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  const areas = useMemo(
    () => ["All areas", ...Array.from(new Set(store.matches.map((match) => match.area)))],
    [store.matches],
  );

  const filteredMatches = useMemo(() => {
    const search = query.trim().toLowerCase();

    return store.matches.filter((match) => {
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
  }, [area, query, status, store.matches]);

  if (!isLoggedIn) return <AuthLoading />;

  const highUrgencyCount = store.matches.filter((match) => match.urgency === "High").length;
  const volunteerNeededCount = store.matches.filter((match) => match.status === "Needs volunteer").length;
  const hasFilters = query.trim() !== "" || area !== "All areas" || status !== "All statuses";

  function clearFilters() {
    setQuery("");
    setArea("All areas");
    setStatus("All statuses");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <PageHeader
        title="Food Match Center"
        description="Live donation offers, beneficiary needs, and volunteer dispatch status in one queue."
      />

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <Card title={String(store.matches.length)} description="Open matches">
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
        <section className="mt-5">
          <EmptyState
            title="No matches found"
            message="Try a different area, status, or search term."
            action={
              hasFilters ? (
                <Button type="button" variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : null
            }
          />
        </section>
      ) : null}

      <Modal open={Boolean(selectedMatch)} title="Coordinate Match" onClose={() => setSelectedMatch(null)}>
        {selectedMatch ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">{selectedMatch.id}</span> is ready for route
              planning.
            </p>
            <div className="rounded-lg border border-green-100 bg-green-50 p-3">
              <p className="font-semibold text-[#166534]">{selectedMatch.route}</p>
              <p className="mt-1">{selectedMatch.pickupWindow}</p>
            </div>
            <div className="grid gap-2">
              <Button
                type="button"
                onClick={() => {
                  updateMatchStatus(selectedMatch.id, "Needs volunteer");
                  pushToast("Volunteer requested for this match.");
                  setSelectedMatch(null);
                }}
              >
                Request volunteer
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  updateMatchStatus(selectedMatch.id, "Scheduled");
                  pushToast("Match marked scheduled.");
                  setSelectedMatch(null);
                }}
              >
                Mark scheduled
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  updateMatchStatus(selectedMatch.id, "Completed");
                  pushToast("Match marked completed.");
                  setSelectedMatch(null);
                }}
              >
                Mark completed
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </main>
  );
}
