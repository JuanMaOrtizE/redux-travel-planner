import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth";
import MainLayout from "../layouts/MainLayout";
import CreateTripPage from "../pages/CreateTripPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import TripDetailPage from "../pages/TripDetailPage";
import TripsPage from "../pages/TripsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/login", Component: LoginPage },
      {
        Component: RequireAuth,
        children: [
          { index: true, Component: HomePage },
          { path: "/trips", Component: TripsPage },
          { path: "/trips/new", Component: CreateTripPage },
          { path: "/trips/:tripId", Component: TripDetailPage },
        ],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
