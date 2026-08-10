import { z } from "zod";
import { AppError } from "../../common/errors/AppError.js";

const OPEN_METEO_GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const GEOCODING_TIMEOUT_MS = 5_000;

const openMeteoLocationSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  country_code: z.string().length(2).optional(),
  country: z.string().min(1).optional(),
  timezone: z.string().min(1).optional(),
  admin1: z.string().min(1).optional(),
});

const openMeteoGeocodingResponseSchema = z.object({
  results: z.array(openMeteoLocationSchema).optional(),
});

export type DestinationSearchResult = {
  providerId: string;
  name: string;
  country: string | null;
  countryCode: string | null;
  latitude: number;
  longitude: number;
  timezone: string | null;
  region: string | null;
};

export function normalizeOpenMeteoGeocodingResponse(
  input: unknown,
): DestinationSearchResult[] {
  const parsedResponse = openMeteoGeocodingResponseSchema.parse(input);
  const locations = parsedResponse.results ?? [];

  return locations.map((location) => ({
    providerId: String(location.id),
    name: location.name,
    country: location.country ?? null,
    countryCode: location.country_code ?? null,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone ?? null,
    region: location.admin1 ?? null,
  }));
}

export async function searchDestinationsWithOpenMeteo(
  searchTerm: string,
): Promise<DestinationSearchResult[]> {
  const requestUrl = new URL(OPEN_METEO_GEOCODING_URL);

  requestUrl.search = new URLSearchParams({
    name: searchTerm,
    count: "5",
    language: "es",
    format: "json",
  }).toString();

  try {
    const response = await fetch(requestUrl, {
      signal: AbortSignal.timeout(GEOCODING_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Open-Meteo respondió con HTTP ${response.status}`);
    }

    const responseBody: unknown = await response.json();

    return normalizeOpenMeteoGeocodingResponse(responseBody);
  } catch (error) {
    console.error(
      "Falló la consulta de geocodificación de Open-Meteo",
      error,
    );

    throw new AppError(
      502,
      "GEOCODING_PROVIDER_ERROR",
      "No pudimos consultar los destinos en este momento",
    );
  }
}
