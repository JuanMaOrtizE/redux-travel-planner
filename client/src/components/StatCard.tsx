type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

export default function StatCard({ label, value, description }: StatCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h2 className="mt-3 text-3xl font-bold">{value}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </article>
  );
}
