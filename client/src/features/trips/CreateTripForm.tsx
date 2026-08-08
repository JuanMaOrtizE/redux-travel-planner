import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  createTripSchema,
  type CreateTripFormValues,
} from "./createTrip.schema";
import { useCreateTripMutation } from "./tripsApi";
import { mapCreateTripFormToRequest } from "./createTrip.mapper";

export default function CreateTripForm() {
  const [createTrip, { isLoading, isError }] = useCreateTripMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripFormValues>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      currency: "USD",
      budgetLimit: "",
    },
  });

  async function handleCreateTripSubmit(values: CreateTripFormValues) {
    const request = mapCreateTripFormToRequest(values);
    try {
      await createTrip(request).unwrap();
      navigate("/trips", { replace: true });
    } catch {
      // isError ya representa el fallo de la mutation en la interfaz.
    }
  }

  return (
    <form
      className="mt-8 max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
      aria-busy={isLoading}
      noValidate
      onSubmit={handleSubmit(handleCreateTripSubmit)}
    >
      {isError && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800"
          role="alert"
        >
          No pudimos crear el viaje. Intenta nuevamente.
        </p>
      )}

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="title"
        >
          Título
        </label>

        <input
          className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
            errors.title
              ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
              : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
          }`}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
          id="title"
          type="text"
          {...register("title")}
        />

        {errors.title?.message && (
          <p id="title-error" className="text-sm text-red-700" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="description"
        >
          Descripción{" "}
          <span className="font-normal text-slate-500">(opcional)</span>
        </label>
        <textarea
          className={`block w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
            errors.description
              ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
              : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
          }`}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          id="description"
          rows={4}
          {...register("description")}
        />
        {errors.description?.message && (
          <p
            id="description-error"
            className="text-sm text-red-700"
            role="alert"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="startDate"
          >
            Fecha inicial
          </label>
          <input
            className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
              errors.startDate
                ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
            }`}
            aria-invalid={Boolean(errors.startDate)}
            aria-describedby={
              errors.startDate ? "start-date-error" : undefined
            }
            id="startDate"
            type="date"
            {...register("startDate")}
          />
          {errors.startDate?.message && (
            <p
              id="start-date-error"
              className="text-sm text-red-700"
              role="alert"
            >
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="endDate"
          >
            Fecha final
          </label>
          <input
            className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
              errors.endDate
                ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
            }`}
            aria-invalid={Boolean(errors.endDate)}
            aria-describedby={errors.endDate ? "end-date-error" : undefined}
            id="endDate"
            type="date"
            {...register("endDate")}
          />
          {errors.endDate?.message && (
            <p
              id="end-date-error"
              className="text-sm text-red-700"
              role="alert"
            >
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="currency"
          >
            Moneda
          </label>
          <select
            className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
              errors.currency
                ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
            }`}
            aria-invalid={Boolean(errors.currency)}
            aria-describedby={
              errors.currency ? "currency-error" : undefined
            }
            id="currency"
            {...register("currency")}
          >
            <option value="USD">USD — Dólar estadounidense</option>
            <option value="COP">COP — Peso colombiano</option>
            <option value="EUR">EUR — Euro</option>
          </select>
          {errors.currency?.message && (
            <p
              id="currency-error"
              className="text-sm text-red-700"
              role="alert"
            >
              {errors.currency.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="budgetLimit"
          >
            Presupuesto máximo{" "}
            <span className="font-normal text-slate-500">(opcional)</span>
          </label>
          <input
            className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 ${
              errors.budgetLimit
                ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
            }`}
            aria-invalid={Boolean(errors.budgetLimit)}
            aria-describedby={
              errors.budgetLimit ? "budget-limit-error" : undefined
            }
            id="budgetLimit"
            type="text"
            inputMode="decimal"
            placeholder="2500.00"
            {...register("budgetLimit")}
          />
          {errors.budgetLimit?.message && (
            <p
              id="budget-limit-error"
              className="text-sm text-red-700"
              role="alert"
            >
              {errors.budgetLimit.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <Link
          className={`inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
            isLoading
              ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
          aria-disabled={isLoading}
          tabIndex={isLoading ? -1 : undefined}
          onClick={(event) => {
            if (isLoading) event.preventDefault();
          }}
          to="/trips"
        >
          Cancelar
        </Link>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creando viaje..." : "Crear viaje"}
        </button>
      </div>
    </form>
  );
}
