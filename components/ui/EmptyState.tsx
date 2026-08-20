import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  message: string;
  action?: ReactNode;
};

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-green-300 bg-green-50 p-5 text-center">
      <p className="text-sm font-semibold text-[#166534]">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      {action ? <div className="mt-3 flex justify-center">{action}</div> : null}
    </div>
  );
}
