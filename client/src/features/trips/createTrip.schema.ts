import { z } from "zod";

export const createTripSchema = z
  .strictObject({
    title: z
      .string()
      .trim()
      .min(2, "El título debe tener al menos 2 caracteres")
      .max(120, "El título no puede superar 120 caracteres"),
    description: z
      .string()
      .trim()
      .max(1000, "La descripción no puede superar 1000 caracteres")
      .optional(),
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
      .regex(/^$|^\d{1,10}(?:\.\d{1,2})?$/, "Presupuesto inválido")
      .optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "La fecha final no puede ser anterior a la inicial",
    path: ["endDate"],
  });

export type CreateTripFormValues = z.infer<typeof createTripSchema>;
