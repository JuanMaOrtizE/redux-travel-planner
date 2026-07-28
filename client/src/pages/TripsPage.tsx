export default function TripsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Viajes</h1>
        <p className="mt-3 text-slate-600">
          Aquí aparecerán los viajes que planifiques.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8">
        <h2 className="text-lg font-semibold">Todavía no hay viajes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Más adelante podrás crear viajes, agregar destinos y organizar tu
          itinerario.
        </p>
      </section>
    </main>
  );
}
