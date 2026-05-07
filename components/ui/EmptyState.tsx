type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-teal-300 bg-teal-50 p-5 text-center">
      <p className="text-sm font-semibold text-[#134e4a]">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
    </div>
  );
}
