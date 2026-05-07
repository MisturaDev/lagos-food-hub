import { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="rounded-xl border border-teal-100 bg-white p-6 shadow-sm">
      {title ? <h2 className="text-xl font-bold text-[#134e4a]">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      <div className={title || description ? "mt-5" : ""}>{children}</div>
    </section>
  );
}
