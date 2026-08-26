import { z } from "zod";

const localDateTimeSchema = (error: string) =>
  z.iso.datetime({
    local: true,
    precision: -1,
    error,
  });

export const createActivitySchema = z
  .strictObject({
    tripDestinationId: z.union([
      z.literal(""),
      z.uuid("El identificador de la parada debe ser un UUID válido"),
    ]),

    title: z
      .string()
      .trim()
      .min(2, "El título debe tener al menos 2 caracteres")
      .max(160, "El título no puede superar 160 caracteres"),

    description: z
      .string()
      .trim()
      .max(2000, "La descripción no puede superar 2000 caracteres"),

    locationName: z
      .string()
      .trim()
      .max(200, "La ubicación no puede superar 200 caracteres"),

    startsAt: localDateTimeSchema("Selecciona una fecha y hora inicial válida"),

    endsAt: z.union([
      z.literal(""),
      localDateTimeSchema("Selecciona una fecha y hora final válida"),
    ]),
  })
  .refine(
    (values) => values.endsAt === "" || values.endsAt >= values.startsAt,
    {
      message: "La fecha final no puede ser anterior a la inicial",
      path: ["endsAt"],
    },
  );

export type CreateActivityFormValues = z.infer<typeof createActivitySchema>;
