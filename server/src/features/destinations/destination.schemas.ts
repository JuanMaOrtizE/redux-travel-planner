import { z } from "zod";

export const destinationSearchQuerySchema = z.strictObject({
  q: z
    .string()
    .trim()
    .min(2, "La búsqueda debe tener al menos dos caracteres")
    .max(100, "La búsqueda no puede superar los 100 caracteres"),
});

export const destinationCandidateSchema = z.strictObject({
  providerId: z
    .string()
    .trim()
    .min(1, "El identificador del proveedor es obligatorio")
    .max(32, "El identificador no puede superar 32 caracteres")
    .regex(/^\d+$/, "El identificador solo puede contener números"),

  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(200, "El nombre no puede superar 200 caracteres"),

  country: z
    .string()
    .trim()
    .min(1, "El país no puede estar vacío")
    .max(120, "El país no puede superar 120 caracteres")
    .nullable(),

  countryCode: z
    .string()
    .trim()
    .length(2, "El código de país debe tener dos caracteres")
    .toUpperCase()
    .nullable(),

  latitude: z
    .number("La latitud debe ser un número")
    .min(-90, "La latitud mínima es -90")
    .max(90, "La latitud máxima es 90"),

  longitude: z
    .number("La longitud debe ser un número")
    .min(-180, "La longitud mínima es -180")
    .max(180, "La longitud máxima es 180"),

  timezone: z
    .string()
    .trim()
    .min(1, "La zona horaria no puede estar vacía")
    .max(80, "La zona horaria no puede superar 80 caracteres")
    .nullable(),

  region: z
    .string()
    .trim()
    .min(1, "La región no puede estar vacía")
    .max(160, "La región no puede superar 160 caracteres")
    .nullable(),
});

export type DestinationSearchQuery = z.infer<
  typeof destinationSearchQuerySchema
>;

export type DestinationCandidateInput = z.infer<
  typeof destinationCandidateSchema
>;
