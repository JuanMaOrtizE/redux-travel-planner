const rawApiUrl: unknown = import.meta.env.VITE_API_URL;

if (typeof rawApiUrl !== "string" || rawApiUrl.trim() === "") {
  throw new Error("VITE_API_URL es obligatoria");
}

const API_URL = rawApiUrl.trim();

try {
  new URL(API_URL);
} catch {
  throw new Error("VITE_API_URL debe ser una URL valida");
}

export { API_URL };
