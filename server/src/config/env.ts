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

const rawJwtSecret = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV ?? "development";

if (!rawJwtSecret || rawJwtSecret.length < 64) {
  throw new Error("JWT_SECRET debe contener al menos 64 caracteres");
}

if (!["development", "test", "production"].includes(NODE_ENV)) {
  throw new Error("NODE_ENV debe ser development, test o production");
}

const JWT_SECRET = rawJwtSecret;

export { PORT, CLIENT_URL, DATABASE_URL, JWT_SECRET, NODE_ENV };
