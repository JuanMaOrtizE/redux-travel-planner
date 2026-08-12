import { z } from "zod";

export const destinationSearchSchema = z.strictObject({
  searchTerm: z
    .string()
    .trim()
    .min(2, "La búsqueda debe tener al menos dos caracteres")
    .max(100, "La búsqueda no puede superar los 100 caracteres"),
});

export type DestinationSearchFormValues = z.infer<
  typeof destinationSearchSchema
>;
