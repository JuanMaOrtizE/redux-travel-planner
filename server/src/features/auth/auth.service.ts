import prisma from "../../lib/prisma.js";
import { AppError } from "../../common/errors/AppError.js";
import { hashPassword, verifyPassword } from "./auth.password.js";
import type { RegisterInput, LoginInput } from "./auth.schemas.js";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export async function registerUser(input: RegisterInput): Promise<AuthUser> {
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

export async function loginUser(input: LoginInput): Promise<AuthUser> {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      passwordHash: true,
    },
  });

  if (!existingUser) {
    throw new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Email o contraseña incorrectos",
    );
  }

  const passwordMatches = await verifyPassword(
    input.password,
    existingUser.passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Email o contraseña incorrectos",
    );
  }

  const publicUser = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    createdAt: existingUser.createdAt,
  };

  return publicUser;
}

export async function getCurrentUser(userId: string): Promise<AuthUser> {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!currentUser) {
    throw new AppError(401, "AUTHENTICATION_REQUIRED", "Debes iniciar sesion");
  }
  return currentUser;
}
