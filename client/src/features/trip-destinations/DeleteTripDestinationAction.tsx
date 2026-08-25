import { useEffect, useRef } from "react";
import { MapPinMinus } from "lucide-react";
import { useDeleteTripDestinationMutation } from "./tripDestinationsApi";

type DeleteTripDestinationActionProps = {
  tripId: string;
  tripDestinationId: string;
  destinationName: string;
  isConfirming: boolean;
  onOpenConfirmation: () => void;
  onCloseConfirmation: () => void;
  isDisabled: boolean;
};

export default function DeleteTripDestinationAction({
  tripId,
  tripDestinationId,
  destinationName,
  isConfirming,
  onOpenConfirmation,
  onCloseConfirmation,
  isDisabled,
}: DeleteTripDestinationActionProps) {
  const [deleteTripDestination, { isLoading, isError, isSuccess, reset }] =
    useDeleteTripDestinationMutation();
  const isActionLocked = isLoading || isSuccess;
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const wasConfirmingRef = useRef(isConfirming);

  useEffect(() => {
    if (wasConfirmingRef.current && !isConfirming) {
      openButtonRef.current?.focus();
    }

    wasConfirmingRef.current = isConfirming;
  }, [isConfirming]);

  function handleOpenConfirmation() {
    if (isDisabled) return;
    reset();
    onOpenConfirmation();
  }

  function handleCancelConfirmation() {
    if (isActionLocked) return;

    reset();
    onCloseConfirmation();
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
        className="z-10 col-start-1 row-start-1 flex min-w-0 flex-col justify-center gap-3 bg-white/10 p-4 backdrop-blur-sm sm:p-5 lg:p-6"
      >
        <div className="min-w-0">
          <p className="wrap-break-words font-semibold text-slate-950">
            ¿Quitar {destinationName} del recorrido?
          </p>
          {isError ? (
            <p
              className="mt-1 text-sm font-medium leading-5 text-red-800"
              role="alert"
            >
              No pudimos quitar esta parada. Intenta nuevamente.
            </p>
          ) : (
            <p className="mt-1 text-sm leading-5 text-slate-700">
              El destino seguirá disponible para otros viajes.
            </p>
          )}
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <button
            autoFocus
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            disabled={isActionLocked}
            onClick={handleCancelConfirmation}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
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
      className="absolute right-4 top-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent sm:right-5 sm:top-5 lg:right-6 lg:top-6"
      type="button"
      onClick={handleOpenConfirmation}
      disabled={isDisabled}
      ref={openButtonRef}
    >
      <MapPinMinus aria-hidden="true" size={18} />
      <span className="sr-only">Quitar {destinationName} del recorrido</span>
    </button>
  );
}
