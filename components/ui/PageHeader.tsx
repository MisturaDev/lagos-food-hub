import Link from "next/link";
import type { ReactNode } from "react";

type PageHeaderProps = {
  crumb?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ crumb = "Home", title, description, actions }: PageHeaderProps) {
  return (
    <section className="mt-4 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">
          <Link href="/" className="hover:text-[#16A34A]">
            {crumb}
          </Link>{" "}
          / <span className="font-semibold text-slate-700">{title}</span>
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-[#166534] md:text-3xl">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </section>
  );
}
