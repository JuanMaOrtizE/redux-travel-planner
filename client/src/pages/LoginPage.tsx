import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useLoginMutation,
} from "../features/auth/authApi";
import { loginSchema } from "../features/auth/login.schema";
import type { LoginFormValues } from "../features/auth/login.schema";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    data: currentUserResponse,
    isLoading: isCheckingSession,
    isFetching: isFetchingSession,
    isError: isSessionError,
    error: sessionError,
    refetch: refetchCurrentUser,
  } = useGetCurrentUserQuery();

  const [login, { isUninitialized, isLoading, isError, error }] =
    useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isInvalidCredentials =
    isError && error !== undefined && "status" in error && error.status === 401;

  const isUnauthenticated =
    isSessionError &&
    sessionError !== undefined &&
    "status" in sessionError &&
    sessionError.status === 401;

  async function handleLoginSubmit(values: LoginFormValues) {
    try {
      await login(values).unwrap();
      navigate("/trips", { replace: true });
    } catch {
      // isError y error ya representan el fallo en la interfaz.
    } finally {
      reset({
        email: values.email,
        password: "",
      });
    }
  }

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

  if (currentUserResponse) {
    return <Navigate to="/trips" replace />;
  }

  if (isSessionError && !isUnauthenticated) {
    return (
      <main>
        <p role="alert">No pudimos comprobar tu sesión. Intenta nuevamente.</p>
        <button type="button" onClick={refetchCurrentUser}>
          Reintentar
        </button>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h1>Iniciar sesión</h1>
        {isUninitialized && (
          <p>Accede para consultar y administrar tus viajes.</p>
        )}
        {isError && (
          <p role="alert">
            {isInvalidCredentials
              ? "Email o contraseña incorrectos."
              : "No pudimos iniciar sesión. Intenta nuevamente."}
          </p>
        )}

        <form onSubmit={handleSubmit(handleLoginSubmit)} noValidate>
          <label htmlFor="email">Ingresa tu correo</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email?.message && <p role="alert">{errors.email.message}</p>}
          <label htmlFor="password">Ingresa tu contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p role="alert">{errors.password.message}</p>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}
