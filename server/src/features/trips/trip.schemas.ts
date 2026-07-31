import { z } from "zod";

export const createTripSchema = z
  .strictObject({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().min(1).max(1000).optional(),
    startDate: z.iso.date("La fecha debe usar el formato YYYY-MM-DD"),
    endDate: z.iso.date("La fecha debe usar el formato YYYY-MM-DD"),
    currency: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}$/, "La moneda debe tener tres letras"),
    budgetLimit: z
      .string()
      .trim()
      .regex(/^\d{1,10}(\.\d{1,2})?$/, "Presupuesto invalido")
      .optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "La fecha final no puede ser anterior a la inicial",
    path: ["endDate"],
  });

export const tripParamsSchema = z.strictObject({
  tripId: z.uuid("El identificador del viaje debe ser un UUID válido"),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type TripParams = z.infer<typeof tripParamsSchema>;
