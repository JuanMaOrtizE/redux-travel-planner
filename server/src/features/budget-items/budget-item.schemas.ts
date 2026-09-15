import { z } from "zod";
import { BudgetCategory } from "../../generated/prisma/enums.js";

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

const activityIdSchema = z
  .uuid("El identificador de la actividad debe ser un UUID valido")
  .nullable();

const descriptionSchema = z
  .string()
  .trim()
  .min(2, "La descripcion debe tener al menos 2 caracteres")
  .max(200, "La descripcion no puede superar 200 caracteres");

export const createBudgetItemSchema = z.strictObject({
  activityId: activityIdSchema.optional(),
  category: z.enum(BudgetCategory),
  description: descriptionSchema,
  estimatedAmount: positiveDecimalAmountSchema,
  actualAmount: decimalAmountSchema.nullable().optional(),
});

export const updateBudgetItemSchema = z
  .strictObject({
    activityId: activityIdSchema.optional(),
    category: z.enum(BudgetCategory).optional(),
    description: descriptionSchema.optional(),
    estimatedAmount: positiveDecimalAmountSchema.optional(),
    actualAmount: decimalAmountSchema.nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const budgetItemParamsSchema = z.strictObject({
  tripId: z.uuid("El identificador del viaje debe ser un UUID valido"),
  budgetItemId: z.uuid(
    "El identificador de la partida debe ser un UUID valido",
  ),
});

export type CreateBudgetItemInput = z.infer<
  typeof createBudgetItemSchema
>;
export type UpdateBudgetItemInput = z.infer<
  typeof updateBudgetItemSchema
>;
export type BudgetItemParams = z.infer<typeof budgetItemParamsSchema>;
