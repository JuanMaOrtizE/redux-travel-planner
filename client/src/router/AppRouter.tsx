import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import TripsPage from "../pages/TripsPage";
import LoginPage from "../pages/LoginPage";
import TripDetailPage from "../pages/TripDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/login", Component: LoginPage },
      { path: "/trips", Component: TripsPage },
      { path: "/trips/:tripId", Component: TripDetailPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
