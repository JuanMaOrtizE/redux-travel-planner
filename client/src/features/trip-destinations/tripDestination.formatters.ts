import type { TripDestination } from "./tripDestination.types";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(`${value}T00:00:00.000Z`));
}

export function getDestinationContext(
  tripDestination: TripDestination,
): string | null {
  const { destination } = tripDestination;
  const country = destination.country ?? destination.countryCode;
  const parts = [destination.region, country].filter(
    (value): value is string => value !== null,
  );

  return parts.length > 0 ? parts.join(", ") : null;
}

export function getDateLabel(tripDestination: TripDestination): string {
  const { arrivalDate, departureDate } = tripDestination;

  if (arrivalDate && departureDate) {
    if (arrivalDate === departureDate) {
      return formatDate(arrivalDate);
    }

    return `${formatDate(arrivalDate)} – ${formatDate(departureDate)}`;
  }

  if (arrivalDate) {
    return `Llegada: ${formatDate(arrivalDate)}`;
  }

  if (departureDate) {
    return `Salida: ${formatDate(departureDate)}`;
  }

  return "Fechas por definir";
}
