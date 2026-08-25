import { z } from "zod";

export const createActivitySchema = z
  .strictObject({
    tripDestinationId: z
      .uuid("El identificador de la parada debe ser un UUID válido")
      .nullable()
      .optional(),
    title: z.string().trim().min(2).max(160),
    description: z
      .string()
      .trim()
      .max(2000, "La descripción no puede superar 2000 caracteres")
      .nullable()
      .optional()
      .transform((value) => (value === "" ? null : value)),
    locationName: z
      .string()
      .trim()
      .max(200, "La ubicación no puede superar 200 caracteres")
      .nullable()
      .optional()
      .transform((value) => (value === "" ? null : value)),
    startsAt: z.iso.datetime({
      offset: true,
      error: "La fecha de inicio debe usar formato ISO con zona horaria",
    }),
    endsAt: z.iso
      .datetime({
        offset: true,
        error: "La fecha final debe usar formato ISO con zona horaria",
      })
      .nullable()
      .optional(),
  })
  .refine(
    (data) =>
      data.endsAt == null ||
      new Date(data.endsAt).getTime() >= new Date(data.startsAt).getTime(),
    {
      message: "La fecha final no puede ser anterior a la inicial",
      path: ["endsAt"],
    },
  );

export const deleteActivityParamsSchema = z.strictObject({
  tripId: z.uuid("El identificador del viaje debe ser un UUID válido"),
  activityId: z.uuid(
    "El identificador de la actividad debe ser un UUID válido",
  ),
});
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type DeleteActivityParams = z.infer<typeof deleteActivityParamsSchema>;
