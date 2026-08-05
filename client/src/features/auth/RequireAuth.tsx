import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "./authApi";

export default function RequireAuth() {
  const {
    data: currentUserResponse,
    isLoading: isCheckingSession,
    isFetching: isFetchingSession,
    isError,
    error,
    refetch: refetchCurrentUser,
  } = useGetCurrentUserQuery();

  const isUnauthenticated =
    isError && error !== undefined && "status" in error && error.status === 401;

  if (isCheckingSession) {
    return (
      <main>
        <p>Comprobando sesión...</p>
      </main>
    );
  }

  if (isFetchingSession && currentUserResponse === undefined) {
    return (
      <main>
        <p>Reintentando comprobar sesión...</p>
      </main>
    );
  }

  if (isUnauthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isError && !isUnauthenticated) {
    return (
      <main>
        <p role="alert">No pudimos comprobar tu sesión. Intenta nuevamente.</p>
        <button type="button" onClick={refetchCurrentUser}>
          Reintentar
        </button>
      </main>
    );
  }

  if (currentUserResponse) {
    return <Outlet />;
  }

  return null;
}
