import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { api } from "../../services/api";
import { useGetCurrentUserQuery, useLogoutMutation } from "./authApi";

export default function AuthNavigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout, { isLoading: isLoggingOut, isError: isLogoutError }] =
    useLogoutMutation();

  const { data: currentUserResponse, isLoading: isCheckingSession } =
    useGetCurrentUserQuery();

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(api.util.resetApiState());
      navigate("/login", { replace: true });
    } catch {
      // isLogoutError representa el fallo en la interfaz.
    }
  }

  if (isCheckingSession) {
    return <span>Comprobando sesión...</span>;
  }

  if (!currentUserResponse) {
    return <NavLink to="/login">Login</NavLink>;
  }

  return (
    <>
      <span>{currentUserResponse.data.user.name}</span>

      {isLogoutError && <span role="alert">No pudimos cerrar la sesión.</span>}

      <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
    </>
  );
}
