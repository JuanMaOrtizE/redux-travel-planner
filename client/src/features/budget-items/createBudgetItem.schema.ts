import { z } from "zod";

const decimalAmountSchema = z
  .string()
  .trim()
  .regex(
    /^(0|[1-9]\d{0,9})(\.\d{1,2})?$/,
    "El importe debe tener hasta diez enteros y dos decimales",
  );

const positiveDecimalAmountSchema = decimalAmountSchema.refine(
  (value) => /[1-9]/.test(value),
  "El importe estimado debe ser mayor que cero",
);

export const createBudgetItemSchema = z.strictObject({
  activityId: z.union([
    z.literal(""),
    z.uuid("El identificador de la actividad debe ser un UUID válido"),
  ]),
  category: z.enum(
    [
      "ACCOMMODATION",
      "TRANSPORT",
      "FOOD",
      "ACTIVITIES",
      "SHOPPING",
      "OTHER",
    ],
    { error: "Selecciona una categoría válida" },
  ),
  description: z
    .string()
    .trim()
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .max(200, "La descripción no puede superar 200 caracteres"),
  estimatedAmount: positiveDecimalAmountSchema,
  actualAmount: z.union([z.literal(""), decimalAmountSchema]),
});

export type CreateBudgetItemFormValues = z.infer<
  typeof createBudgetItemSchema
>;
