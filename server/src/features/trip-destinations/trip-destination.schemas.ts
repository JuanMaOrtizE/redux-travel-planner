import { z } from "zod";
import { destinationCandidateSchema } from "../destinations/destination.schemas.js";

export const createTripDestinationSchema = z
  .strictObject({
    destination: destinationCandidateSchema,
    arrivalDate: z
      .iso.date("La fecha de llegada debe usar el formato YYYY-MM-DD")
      .nullable()
      .optional(),
    departureDate: z
      .iso.date("La fecha de salida debe usar el formato YYYY-MM-DD")
      .nullable()
      .optional(),
    notes: z
      .string()
      .trim()
      .max(1000, "Las notas no pueden superar 1000 caracteres")
      .nullable()
      .optional()
      .transform((value) => (value === "" ? null : value)),
  })
  .refine(
    (data) =>
      data.arrivalDate == null ||
      data.departureDate == null ||
      data.arrivalDate <= data.departureDate,
    {
      message: "La fecha de salida no puede ser anterior a la de llegada",
      path: ["departureDate"],
    },
  );

export type CreateTripDestinationInput = z.infer<
  typeof createTripDestinationSchema
>;
