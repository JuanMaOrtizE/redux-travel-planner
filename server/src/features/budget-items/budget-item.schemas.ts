import { z } from "zod";
import { BudgetCategory } from "../../generated/prisma/enums.js";

const decimalAmountSchema = z
  .string()
  .trim()
  .regex(
    /^(0|[1-9]\d{0,9})(\.\d{1,2})?$/,
    "El importe debe tener hasta diez enteros y dos decimales",
  );

export const createBudgetItemSchema = z.strictObject({
  activityId: z
    .uuid("El identificador de la actividad debe ser un UUID valido")
    .nullable()
    .optional(),
  category: z.enum(BudgetCategory),
  description: z
    .string()
    .trim()
    .min(2, "La descripcion debe tener al menos 2 caracteres")
    .max(200, "La descripcion no puede superar 200 caracteres"),
  estimatedAmount: decimalAmountSchema.refine(
    (value) => /[1-9]/.test(value),
    "El importe estimado debe ser mayor que cero",
  ),
  actualAmount: decimalAmountSchema.nullable().optional(),
});

export type CreateBudgetItemInput = z.infer<
  typeof createBudgetItemSchema
>;
