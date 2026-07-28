import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectViewMode, setViewMode } from "./uiSlice";

export default function ViewModeToggle() {
  const viewMode = useAppSelector(selectViewMode);
  const dispatch = useAppDispatch();

  return (
    <div className="flex rounded-lg border border-slate-200 bg-white p-1">
      <button
        type="button"
        onClick={() => dispatch(setViewMode("grid"))}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
          viewMode === "grid"
            ? "bg-teal-700 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Grilla
      </button>
      <button
        type="button"
        onClick={() => dispatch(setViewMode("list"))}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
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
