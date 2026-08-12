import {
  NavLink,
  Outlet,
  type NavLinkRenderProps,
} from "react-router-dom";
import AuthNavigation from "../features/auth/AuthNavigation";

function getNavLinkClassName({ isActive }: NavLinkRenderProps): string {
  return `rounded-lg px-2.5 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
    isActive
      ? "bg-teal-50 text-teal-800"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;
}

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
        >
          <NavLink to="/" className="font-semibold text-teal-700">
            Travel Planner
          </NavLink>

          <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-2 text-sm font-medium sm:gap-x-4">
            <NavLink className={getNavLinkClassName} end to="/">
              Inicio
            </NavLink>
            <NavLink className={getNavLinkClassName} to="/trips">
              Viajes
            </NavLink>
            <NavLink className={getNavLinkClassName} to="/destinations">
              Destinos
            </NavLink>
            <AuthNavigation />
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
