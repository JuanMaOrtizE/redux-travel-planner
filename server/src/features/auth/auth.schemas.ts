import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("El email no es válido"));

export const registerSchema = z.strictObject({
  name: z.string().trim().min(2).max(80),
  email: emailSchema,
  password: z.string().min(8).max(72),
});

export const loginSchema = z.strictObject({
  email: emailSchema,
  password: z.string().min(8).max(72),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
