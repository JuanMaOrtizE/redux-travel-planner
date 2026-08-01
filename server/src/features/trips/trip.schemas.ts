import { z } from "zod";
import { TripStatus } from "../../generated/prisma/enums.js";

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

export const updateTripSchema = z
  .strictObject({
    title: z.string().trim().min(2).max(120).optional(),

    description: z.string().trim().min(1).max(1000).nullable().optional(),

    startDate: z.iso
      .date("La fecha debe usar el formato YYYY-MM-DD")
      .optional(),

    endDate: z.iso.date("La fecha debe usar el formato YYYY-MM-DD").optional(),

    status: z.enum(TripStatus).optional(),

    currency: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}$/, "La moneda debe tener tres letras")
      .optional(),

    budgetLimit: z
      .string()
      .trim()
      .regex(/^\d{1,10}(\.\d{1,2})?$/, "Presupuesto invalido")
      .nullable()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  })
  .refine(
    (data) =>
      data.startDate === undefined ||
      data.endDate === undefined ||
      data.endDate >= data.startDate,
    {
      message: "La fecha final no puede ser anterior a la inicial",
      path: ["endDate"],
    },
  );

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type TripParams = z.infer<typeof tripParamsSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
