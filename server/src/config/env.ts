import "dotenv/config";
const PORT = Number(process.env.PORT ?? "4000");
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT debe ser un número entero entre 1 y 65535");
}
export { PORT };
