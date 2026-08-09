import { useRef, type MouseEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteTripMutation } from "./tripsApi";

type DeleteTripActionProps = {
  tripId: string;
  tripTitle: string;
};

export default function DeleteTripAction({
  tripId,
  tripTitle,
}: DeleteTripActionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const [deleteTrip, { isLoading, isError, reset }] = useDeleteTripMutation();

  function handleOpenDialog() {
    reset();
    dialogRef.current?.showModal();
  }

  function handleCloseDialog() {
    dialogRef.current?.close();
  }

  async function handleConfirmDelete() {
    try {
      await deleteTrip(tripId).unwrap();
      navigate("/trips", { replace: true });
    } catch {
      // El estado de error de la mutation se mostrará en la interfaz después.
    }
  }

  function handleDialogCancel(event: SyntheticEvent<HTMLDialogElement>) {
    if (isLoading) {
      event.preventDefault();
    }
  }

  function handleDialogBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget && !isLoading) {
      handleCloseDialog();
    }
  }

  return (
    <>
      <button
        className="inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        type="button"
        aria-label={`Eliminar el viaje ${tripTitle}`}
        onClick={handleOpenDialog}
      >
        Eliminar viaje
      </button>

      <dialog
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
        ref={dialogRef}
        onClick={handleDialogBackdropClick}
        onCancel={handleDialogCancel}
        aria-busy={isLoading}
        aria-labelledby="delete-trip-dialog-title"
        aria-describedby="delete-trip-dialog-description"
      >
        <div className="p-6 sm:p-7">
          <h2
            className="text-xl font-semibold tracking-tight text-slate-900"
            id="delete-trip-dialog-title"
          >
            ¿Eliminar viaje?
          </h2>
          <p
            className="mt-2 text-sm leading-6 text-slate-600"
            id="delete-trip-dialog-description"
          >
            Se eliminará “{tripTitle}”. Esta acción no se puede deshacer.
          </p>
          {isError && (
            <p
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800"
              role="alert"
            >
              No pudimos eliminar el viaje. Intenta nuevamente.
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              type="button"
              onClick={handleCloseDialog}
              disabled={isLoading}
              autoFocus
            >
              Cancelar
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
              type="button"
              onClick={handleConfirmDelete}
              disabled={isLoading}
            >
              {isLoading ? "Eliminando..." : "Eliminar viaje"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
