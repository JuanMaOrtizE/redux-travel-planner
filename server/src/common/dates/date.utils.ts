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

export function toDateKeyInTimeZone(
  value: Date,
  timeZone: string,
): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (year === undefined || month === undefined || day === undefined) {
    throw new Error("No se pudo obtener la fecha en la zona horaria");
  }

  return `${year}-${month}-${day}`;
}
