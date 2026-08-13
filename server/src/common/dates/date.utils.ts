export function toUtcDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

export function toNullableUtcDate(
  value: string | null | undefined,
): Date | null {
  if (value == null) {
    return null;
  }

  return toUtcDate(value);
}
