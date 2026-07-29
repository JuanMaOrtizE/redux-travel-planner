import "dotenv/config";

const PORT = Number(process.env.PORT ?? "4000");
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT debe ser un número entero entre 1 y 65535");
}

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";
try {
  new URL(CLIENT_URL);
} catch {
  throw new Error("CLIENT_URL debe ser una URL válida");
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL es obligatoria");
}
export { PORT, CLIENT_URL, DATABASE_URL };
