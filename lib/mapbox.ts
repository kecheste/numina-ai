/**
 * Mapbox Geocoding API (v5) for place search.
 * Uses NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN (or NEXT_PUBLIC_MAPBOX_API_KEY) from env.
 */

const MAPBOX_BASE = "https://api.mapbox.com/geocoding/v5/mapbox.places";

function getMapboxToken(): string {
  const token =
    typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
  if (!token || typeof token !== "string") {
    throw new Error(
      "Mapbox token missing. Set NEXT_PUBLIC_MAPBOX_API_KEY in .env.local (client-side requires NEXT_PUBLIC_ prefix)."
    );
  }
  return token;
}

export interface MapboxPlaceFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  geometry: { coordinates: [number, number] };
}

export interface MapboxGeocodeResponse {
  type: string;
  features: MapboxPlaceFeature[];
}

/**
 * Search for places via Mapbox Geocoding API.
 * Call only from client (requires NEXT_PUBLIC_* token).
 */
export async function searchPlaces(
  query: string,
  options: { limit?: number } = {}
): Promise<MapboxPlaceFeature[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const token = getMapboxToken();
  const limit = Math.min(Math.max(options.limit ?? 5, 1), 10);
  const url = `${MAPBOX_BASE}/${encodeURIComponent(trimmed)}.json?access_token=${encodeURIComponent(token)}&limit=${limit}&types=place,locality,address,region`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Mapbox geocoding failed: ${res.status}`);
  }

  const data = (await res.json()) as MapboxGeocodeResponse;
  if (!data?.features || !Array.isArray(data.features)) {
    return [];
  }

  return data.features.map((f) => ({
    id: f.id,
    place_name: f.place_name,
    center: f.center ?? f.geometry?.coordinates ?? [0, 0],
    geometry: f.geometry,
  }));
}

/**
 * Get IANA timezone for a point (lat, lng) via the backend.
 * Backend uses a lightweight library (no heavy geocoding).
 */
export async function getTimezoneForCoords(
  lat: number,
  lng: number,
  apiBaseUrl: string
): Promise<string> {
  const url = `${apiBaseUrl.replace(/\/$/, "")}/api/v1/utils/timezone?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;
  const res = await fetch(url);
  if (!res.ok) return "UTC";
  const data = (await res.json()) as { timezone?: string };
  return data.timezone ?? "UTC";
}
