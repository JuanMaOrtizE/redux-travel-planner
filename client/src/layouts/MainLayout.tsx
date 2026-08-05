import { NavLink, Outlet } from "react-router-dom";
import AuthNavigation from "../features/auth/AuthNavigation";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="font-semibold text-teal-700">
            Travel Planner
          </NavLink>

          <div className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/trips">Viajes</NavLink>
            <AuthNavigation />
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
