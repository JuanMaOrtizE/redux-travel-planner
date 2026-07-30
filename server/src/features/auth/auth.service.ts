import prisma from "../../lib/prisma.js";
import { AppError } from "../../common/errors/AppError.js";
import { hashPassword } from "./auth.password.js";
import type { RegisterInput } from "./auth.schemas.js";

type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export async function registerUser(
  input: RegisterInput,
): Promise<RegisteredUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new AppError(
      409,
      "EMAIL_ALREADY_EXISTS",
      "Ya existe una cuenta con este email",
    );
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}
