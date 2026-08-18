import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  destinationSearchSchema,
  type DestinationSearchFormValues,
} from "./destinationSearch.schema";
import type { DestinationSearchResult } from "./destination.types";
import { useSearchDestinationsQuery } from "./destinationsApi";

type DestinationSearchProps = {
  onSelectDestination?: (destination: DestinationSearchResult) => void;
  isSelectingDestination?: boolean;
  selectingProviderId?: string | null;
};

function getDestinationContext(destination: DestinationSearchResult): string {
  const country = destination.country ?? destination.countryCode;
  const locationParts = [destination.region, country].filter(
    (value): value is string => value !== null,
  );

  return locationParts.join(", ") || "Región y país no disponibles";
}

function getDestinationSearchErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "status" in error) {
    switch (error.status) {
      case 400:
        return "El término enviado no es válido. Revísalo e intenta nuevamente.";
      case 401:
        return "Tu sesión venció. Recarga la página e inicia sesión nuevamente.";
      case 429:
        return "Se realizaron demasiadas búsquedas. Espera un momento antes de intentarlo otra vez.";
      case 502:
        return "El servicio de ubicaciones no está disponible en este momento. Intenta nuevamente en unos minutos.";
      case "FETCH_ERROR":
        return "No pudimos conectar con el servidor. Comprueba tu conexión e intenta nuevamente.";
    }
  }

  return "No pudimos completar la búsqueda. Intenta nuevamente.";
}

export default function DestinationSearch({
  onSelectDestination,
  isSelectingDestination = false,
  selectingProviderId = null,
}: DestinationSearchProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DestinationSearchFormValues>({
    resolver: zodResolver(destinationSearchSchema),
    defaultValues: { searchTerm: "" },
  });

  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string | null>(
    null,
  );

  const {
    currentData: destinationsResponse,
    isUninitialized,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error: searchError,
    refetch,
  } = useSearchDestinationsQuery(submittedSearchTerm ?? "", {
    skip: submittedSearchTerm === null,
  });

  const destinations = destinationsResponse?.data.destinations ?? [];
  const hasCurrentResponse = destinationsResponse !== undefined;
  const showLoadingState =
    isLoading || (isFetching && destinationsResponse === undefined);
  const showRefreshingState = isFetching && hasCurrentResponse;
  const showInitialError = isError && !hasCurrentResponse && !isFetching;
  const showRefreshError = isError && hasCurrentResponse && !isFetching;

  function handleSearchSubmit(values: DestinationSearchFormValues) {
    if (isFetching) return;

    setSubmittedSearchTerm(values.searchTerm);
  }

  return (
    <>
      <form
        aria-busy={isFetching}
        className="mt-8 max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
        noValidate
        onSubmit={handleSubmit(handleSearchSubmit)}
      >
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="destination-search-term"
          >
            Ciudad o destino
          </label>

          <input
            className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
              errors.searchTerm
                ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
            }`}
            id="destination-search-term"
            type="text"
            autoComplete="off"
            placeholder="Lima, Medellín o Barcelona"
            aria-invalid={Boolean(errors.searchTerm)}
            aria-describedby={
              errors.searchTerm ? "destination-search-term-error" : undefined
            }
            {...register("searchTerm")}
          />

          {errors.searchTerm?.message && (
            <p
              id="destination-search-term-error"
              className="text-sm text-red-700"
              role="alert"
            >
              {errors.searchTerm.message}
            </p>
          )}
        </div>

        <button
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isFetching}
          type="submit"
        >
          {isFetching ? "Buscando..." : "Buscar destinos"}
        </button>
      </form>

      <section
        aria-busy={isFetching}
        className="mt-8 max-w-2xl"
        aria-labelledby="destination-search-results-title"
      >
        <h2
          id="destination-search-results-title"
          className="text-xl font-semibold tracking-tight"
        >
          Resultados
        </h2>

        {isUninitialized && (
          <p className="mt-3 text-sm text-slate-600">
            Escribe al menos dos caracteres y selecciona «Buscar destinos» para
            consultar candidatos.lima
          </p>
        )}

        {showLoadingState && (
          <div className="mt-4" role="status">
            <p className="text-sm text-slate-600">Buscando destinos...</p>

            <div
              aria-hidden="true"
              className="mt-4 space-y-3 animate-pulse motion-reduce:animate-none"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="h-5 w-40 max-w-full rounded bg-slate-200" />
                <div className="mt-3 h-4 w-64 max-w-full rounded bg-slate-100" />
                <div className="mt-4 h-3 w-52 max-w-full rounded bg-slate-100" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="h-5 w-48 max-w-full rounded bg-slate-200" />
                <div className="mt-3 h-4 w-56 max-w-full rounded bg-slate-100" />
                <div className="mt-4 h-3 w-44 max-w-full rounded bg-slate-100" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="h-5 w-36 max-w-full rounded bg-slate-200" />
                <div className="mt-3 h-4 w-60 max-w-full rounded bg-slate-100" />
                <div className="mt-4 h-3 w-48 max-w-full rounded bg-slate-100" />
              </div>
            </div>
          </div>
        )}

        {showInitialError && (
          <div
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-5"
            role="alert"
          >
            <p className="font-semibold text-red-950">
              No pudimos buscar destinos
            </p>
            <p className="mt-2 text-sm leading-6 text-red-900">
              {getDestinationSearchErrorMessage(searchError)}
            </p>
            <button
              className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isFetching}
              onClick={() => void refetch()}
              type="button"
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {showRefreshingState && (
          <p className="mt-4 text-sm text-slate-600" role="status">
            Actualizando resultados...
          </p>
        )}

        {showRefreshError && (
          <div
            className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-amber-950"
            role="status"
          >
            <p className="text-sm leading-6">
              {getDestinationSearchErrorMessage(searchError)} Mostramos la
              última respuesta disponible.
            </p>
            <button
              className="mt-3 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isFetching}
              onClick={() => void refetch()}
              type="button"
            >
              Reintentar actualización
            </button>
          </div>
        )}

        {isSuccess && destinations.length > 0 && (
          <p className="mt-4 text-sm text-slate-600" role="status">
            Coincidencias encontradas: {destinations.length}.
          </p>
        )}

        {hasCurrentResponse && destinations.length === 0 && (
          <div
            className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-6"
            role="status"
          >
            <p className="font-semibold text-slate-900">
              No encontramos coincidencias
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prueba con otra ciudad, una región más amplia o una forma
              alternativa de escribir el destino.
            </p>
          </div>
        )}

        {hasCurrentResponse && destinations.length > 0 && (
          <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {destinations.map((destination) => {
              const isSelectingThisDestination =
                isSelectingDestination &&
                selectingProviderId === destination.providerId;

              return (
                <li className="min-w-0 p-5" key={destination.providerId}>
                  <p className="wrap-break-words font-semibold text-slate-900">
                    {destination.name}
                  </p>
                  <p className="mt-1 wrap-break-words text-sm text-slate-600">
                    {getDestinationContext(destination)}
                  </p>

                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
                    <div className="flex flex-wrap gap-1">
                      <dt className="font-medium text-slate-700">
                        Coordenadas:
                      </dt>
                      <dd>
                        {destination.latitude.toFixed(4)},{" "}
                        {destination.longitude.toFixed(4)}
                      </dd>
                    </div>

                    {destination.timezone && (
                      <div className="flex min-w-0 flex-wrap gap-1">
                        <dt className="font-medium text-slate-700">
                          Zona horaria:
                        </dt>
                        <dd className="wrap-break-words">
                          {destination.timezone}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {onSelectDestination ? (
                    <button
                      aria-busy={isSelectingThisDestination}
                      className="mt-4 inline-flex items-center justify-center rounded-lg border border-teal-700 px-3 py-2 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-50 disabled:text-slate-500"
                      disabled={isSelectingDestination}
                      type="button"
                      onClick={() => onSelectDestination(destination)}
                    >
                      {isSelectingThisDestination
                        ? "Agregando..."
                        : "Seleccionar destino"}
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
