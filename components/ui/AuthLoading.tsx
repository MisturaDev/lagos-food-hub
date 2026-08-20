export function AuthLoading({ label = "Checking session..." }: { label?: string }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10">
      <div className="h-4 w-40 animate-pulse rounded bg-green-100" />
      <div className="h-10 w-72 animate-pulse rounded-md bg-green-100" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-xl border border-green-100 bg-green-50" />
        <div className="h-28 animate-pulse rounded-xl border border-green-100 bg-green-50" />
        <div className="h-28 animate-pulse rounded-xl border border-green-100 bg-green-50" />
      </div>
      <p className="text-sm font-medium text-[#166534]">{label}</p>
    </main>
  );
}
