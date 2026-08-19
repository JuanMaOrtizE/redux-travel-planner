import { MapPinMinus } from "lucide-react";
import { useState } from "react";
import { useDeleteTripDestinationMutation } from "./tripDestinationsApi";

type DeleteTripDestinationActionProps = {
  tripId: string;
  tripDestinationId: string;
  destinationName: string;
};

export default function DeleteTripDestinationAction({
  tripId,
  tripDestinationId,
  destinationName,
}: DeleteTripDestinationActionProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const [deleteTripDestination, { isLoading, isError, isSuccess, reset }] =
    useDeleteTripDestinationMutation();
  const isActionLocked = isLoading || isSuccess;

  function handleOpenConfirmation() {
    reset();
    setIsConfirming(true);
  }

  function handleCancelConfirmation() {
    if (isActionLocked) return;

    reset();
    setIsConfirming(false);
  }

  async function handleConfirmDelete() {
    if (isActionLocked) return;

    try {
      await deleteTripDestination({
        tripId,
        tripDestinationId,
      }).unwrap();
    } catch {
      // isError mantiene abierta la confirmación y muestra el fallo del servidor.
    }
  }

  if (isConfirming) {
    return (
      <div
        aria-busy={isActionLocked}
        className="absolute inset-0 z-10 flex flex-col justify-center gap-3 bg-white/30 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
      >
        <div className="min-w-0">
          <p className="font-semibold text-slate-950">
            ¿Quitar {destinationName} del recorrido?
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-700">
            El destino seguirá disponible para otros viajes.
          </p>
          {isError ? (
            <p role="alert">
              No pudimos quitar esta parada. Intenta nuevamente.
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <button
            autoFocus
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            disabled={isActionLocked}
            onClick={handleCancelConfirmation}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
            disabled={isActionLocked}
            onClick={handleConfirmDelete}
            type="button"
          >
            <MapPinMinus aria-hidden="true" size={16} />
            {isLoading
              ? "Quitando..."
              : isSuccess
                ? "Actualizando..."
                : "Quitar parada"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
      type="button"
      onClick={handleOpenConfirmation}
    >
      <MapPinMinus aria-hidden="true" size={18} />
      <span className="sr-only">Quitar {destinationName} del recorrido</span>
    </button>
  );
}
