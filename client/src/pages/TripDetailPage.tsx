import { useParams } from "react-router-dom";

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Detalle del viaje</h1>

        <p className="mt-3 text-slate-600">ID del viaje: {tripId}</p>
      </section>
    </main>
  );
}
