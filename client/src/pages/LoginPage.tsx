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

  const [login, { isLoading, isError, error }] = useLoginMutation();

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
      navigate("/", { replace: true });
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
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
        <section
          className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center sm:p-8"
          aria-busy="true"
        >
          <p className="text-sm font-medium text-slate-600" role="status">
            Comprobando sesión...
          </p>
        </section>
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

  if (currentUserResponse && !isSessionError) {
    return <Navigate to="/" replace />;
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
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <header className="mb-8 space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Iniciar sesión
          </h1>

          <p className="text-sm leading-6 text-slate-600">
            Accede para consultar y administrar tus viajes.
          </p>
        </header>
        {isError && (
          <p
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-800"
            role="alert"
          >
            {isInvalidCredentials
              ? "Email o contraseña incorrectos."
              : "No pudimos iniciar sesión. Intenta nuevamente."}
          </p>
        )}

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleLoginSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Correo electrónico
            </label>

            <input
              className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                  : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
              }`}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />

            {errors.email?.message && (
              <p id="email-error" className="text-sm text-red-700" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Contraseña
            </label>

            <input
              className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:border-red-600 focus:ring-red-600/20"
                  : "border-slate-300 focus:border-teal-700 focus:ring-teal-700/20"
              }`}
              id="password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />

            {errors.password?.message && (
              <p
                id="password-error"
                className="text-sm text-red-700"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}
