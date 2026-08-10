import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectViewMode, setViewMode } from "./uiSlice";

export default function ViewModeToggle() {
  const viewMode = useAppSelector(selectViewMode);
  const dispatch = useAppDispatch();

  return (
    <div
      role="group"
      aria-label="Presentación del resumen"
      className="flex rounded-lg border border-slate-200 bg-white p-1"
    >
      <button
        type="button"
        aria-pressed={viewMode === "grid"}
        onClick={() => dispatch(setViewMode("grid"))}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
          viewMode === "grid"
            ? "bg-teal-700 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Cuadrícula
      </button>
      <button
        type="button"
        aria-pressed={viewMode === "list"}
        onClick={() => dispatch(setViewMode("list"))}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
          viewMode === "list"
            ? "bg-teal-700 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Lista
      </button>
    </div>
  );
}
