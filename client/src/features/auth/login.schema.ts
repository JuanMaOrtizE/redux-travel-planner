import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("El email no es válido"));

export const loginSchema = z.strictObject({
  email: emailSchema,
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(72, "La contraseña no puede superar 72 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
