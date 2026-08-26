import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TripDestination } from "../trip-destinations/tripDestination.types";
import type { CreateActivityBody } from "./activity.types";
import { mapCreateActivityFormToBody } from "./createActivity.mapper";
import {
  createActivitySchema,
  type CreateActivityFormValues,
} from "./createActivity.schema";
import { useCreateActivityMutation } from "./activitiesApi";

const FIELD_CLASS_NAME =
  "block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors placeholder:text-slate-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

function getFieldClassName(hasError: boolean): string {
  return `${FIELD_CLASS_NAME} ${
    hasError
      ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
      : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
  }`;
}

function getCreateActivityErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const responseData = error.data;

    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "error" in responseData
    ) {
      const responseError = responseData.error;

      if (
        typeof responseError === "object" &&
        responseError !== null &&
        "message" in responseError &&
        typeof responseError.message === "string"
      ) {
        return responseError.message;
      }
    }
  }

  if (typeof error === "object" && error !== null && "status" in error) {
    switch (error.status) {
      case 401:
        return "Tu sesión venció. Inicia sesión nuevamente.";
      case "FETCH_ERROR":
        return "No pudimos conectar con el servidor. Comprueba tu conexión e intenta nuevamente.";
    }
  }

  return "No pudimos crear la actividad. Intenta nuevamente.";
}

type CreateActivityFormProps = {
  tripId: string;
  tripStartDate: string;
  tripEndDate: string;
  tripDestinations: TripDestination[];
  onCancel: () => void;
  onCreated: () => void;
};

export default function CreateActivityForm({
  tripId,
  tripStartDate,
  tripEndDate,
  tripDestinations,
  onCancel,
  onCreated,
}: CreateActivityFormProps) {
  const [
    createActivity,
    { isLoading, isError, error, reset: resetMutation },
  ] = useCreateActivityMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateActivityFormValues>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      tripDestinationId: "",
      title: "",
      description: "",
      locationName: "",
      startsAt: "",
      endsAt: "",
    },
  });

  const minimumDateTime = `${tripStartDate}T00:00`;
  const maximumDateTime = `${tripEndDate}T23:59`;

  async function handleCreateActivitySubmit(
    values: CreateActivityFormValues,
  ) {
    resetMutation();

    let timeZone = "UTC";

    if (values.tripDestinationId) {
      const selectedTripDestination = tripDestinations.find(
        (tripDestination) =>
          tripDestination.id === values.tripDestinationId,
      );

      if (!selectedTripDestination) {
        setError("tripDestinationId", {
          type: "manual",
          message: "La parada seleccionada ya no está disponible",
        });
        return;
      }

      timeZone = selectedTripDestination.destination.timezone ?? "UTC";
    }

    let body: CreateActivityBody;

    try {
      body = mapCreateActivityFormToBody(values, timeZone);
    } catch {
      setError("startsAt", {
        type: "manual",
        message:
          "No pudimos interpretar la hora de esta actividad. Revisa las fechas e intenta nuevamente.",
      });
      return;
    }

    try {
      await createActivity({ tripId, body }).unwrap();
      resetForm();
      onCreated();
    } catch {
      // La mutation conserva el error HTTP en `error` para mostrarlo abajo.
    }
  }

  function handleCancel(): void {
    resetMutation();
    onCancel();
  }

  return (
    <form
      aria-busy={isLoading}
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-6"
      noValidate
      onSubmit={handleSubmit(handleCreateActivitySubmit)}
    >
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Nueva actividad
        </h3>
        <p className="mt-1 max-w-prose text-sm leading-6 text-slate-600">
          Define cuándo ocurrirá y, si corresponde, relaciónala con una parada.
        </p>
      </div>

      {isError ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900"
          role="alert"
        >
          {getCreateActivityErrorMessage(error)}
        </p>
      ) : null}

      <fieldset className="space-y-5" disabled={isLoading}>
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="activity-trip-destination"
          >
            Parada
          </label>

          <select
            className={getFieldClassName(Boolean(errors.tripDestinationId))}
            id="activity-trip-destination"
            aria-invalid={Boolean(errors.tripDestinationId)}
            aria-describedby={
              errors.tripDestinationId
                ? "activity-trip-destination-hint activity-trip-destination-error"
                : "activity-trip-destination-hint"
            }
            {...register("tripDestinationId")}
          >
            <option value="">Actividad general</option>

            {tripDestinations.map((tripDestination) => (
              <option key={tripDestination.id} value={tripDestination.id}>
                {tripDestination.destination.name}
              </option>
            ))}
          </select>

          <p
            className="text-sm leading-5 text-slate-600"
            id="activity-trip-destination-hint"
          >
            Las actividades generales no pertenecen a una parada específica.
          </p>

          {errors.tripDestinationId?.message && (
            <p
              className="text-sm text-red-700"
              id="activity-trip-destination-error"
              role="alert"
            >
              {errors.tripDestinationId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="activity-title"
          >
            Título
          </label>

          <input
            aria-describedby={
              errors.title ? "activity-title-error" : undefined
            }
            aria-invalid={Boolean(errors.title)}
            autoComplete="off"
            className={getFieldClassName(Boolean(errors.title))}
            id="activity-title"
            type="text"
            {...register("title")}
          />

          {errors.title?.message && (
            <p
              className="text-sm text-red-700"
              id="activity-title-error"
              role="alert"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="activity-description"
          >
            Descripción{" "}
            <span className="font-normal text-slate-500">(opcional)</span>
          </label>
          <textarea
            aria-describedby={
              errors.description ? "activity-description-error" : undefined
            }
            aria-invalid={Boolean(errors.description)}
            className={`${getFieldClassName(Boolean(errors.description))} resize-y`}
            id="activity-description"
            rows={3}
            {...register("description")}
          />
          {errors.description?.message ? (
            <p
              className="text-sm text-red-700"
              id="activity-description-error"
              role="alert"
            >
              {errors.description.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor="activity-location-name"
          >
            Ubicación{" "}
            <span className="font-normal text-slate-500">(opcional)</span>
          </label>
          <input
            aria-describedby={
              errors.locationName ? "activity-location-name-error" : undefined
            }
            aria-invalid={Boolean(errors.locationName)}
            autoComplete="off"
            className={getFieldClassName(Boolean(errors.locationName))}
            id="activity-location-name"
            placeholder="Museo, restaurante o dirección"
            type="text"
            {...register("locationName")}
          />
          {errors.locationName?.message ? (
            <p
              className="text-sm text-red-700"
              id="activity-location-name-error"
              role="alert"
            >
              {errors.locationName.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="activity-starts-at"
            >
              Inicio
            </label>
            <input
              aria-describedby={
                errors.startsAt
                  ? "activity-date-range-hint activity-starts-at-error"
                  : "activity-date-range-hint"
              }
              aria-invalid={Boolean(errors.startsAt)}
              className={getFieldClassName(Boolean(errors.startsAt))}
              id="activity-starts-at"
              max={maximumDateTime}
              min={minimumDateTime}
              type="datetime-local"
              {...register("startsAt")}
            />
            {errors.startsAt?.message ? (
              <p
                className="text-sm text-red-700"
                id="activity-starts-at-error"
                role="alert"
              >
                {errors.startsAt.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="activity-ends-at"
            >
              Final{" "}
              <span className="font-normal text-slate-500">(opcional)</span>
            </label>
            <input
              aria-describedby={
                errors.endsAt
                  ? "activity-date-range-hint activity-ends-at-error"
                  : "activity-date-range-hint"
              }
              aria-invalid={Boolean(errors.endsAt)}
              className={getFieldClassName(Boolean(errors.endsAt))}
              id="activity-ends-at"
              max={maximumDateTime}
              min={minimumDateTime}
              type="datetime-local"
              {...register("endsAt")}
            />
            {errors.endsAt?.message ? (
              <p
                className="text-sm text-red-700"
                id="activity-ends-at-error"
                role="alert"
              >
                {errors.endsAt.message}
              </p>
            ) : null}
          </div>
        </div>

        <p
          className="text-sm leading-5 text-slate-600"
          id="activity-date-range-hint"
        >
          La actividad debe ocurrir entre {tripStartDate} y {tripEndDate}.
        </p>
      </fieldset>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          disabled={isLoading}
          onClick={handleCancel}
          type="button"
        >
          Cancelar
        </button>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-teal-700 disabled:text-white disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Creando actividad..." : "Crear actividad"}
        </button>
      </div>
    </form>
  );
}
