type StatCardProps = {
  label: string;
  value: string;
  description: string;
  variant?: "grid" | "list";
};

export default function StatCard({
  label,
  value,
  description,
  variant = "grid",
}: StatCardProps) {
  if (variant === "list") {
    return (
      <article className="flex items-center justify-between gap-6 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>

        <p className="shrink-0 text-3xl font-bold tabular-nums">{value}</p>
      </article>
    );
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </article>
  );
}
