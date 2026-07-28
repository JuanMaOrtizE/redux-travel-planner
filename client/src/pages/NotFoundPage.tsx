import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Página no encontrada
        </h1>
        <p className="mt-3 text-slate-600">
          La dirección que intentaste visitar no existe.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
