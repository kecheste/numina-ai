/**
 * Place search and timezone helpers.
 * Place search is proxied through our backend so the Mapbox API key is never exposed to the client.
 */

import { getApiBaseUrl } from "./api-client";

export interface MapboxPlaceFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  geometry: { coordinates: [number, number] };
}

interface PlacesSearchResponse {
  type?: string;
  features?: MapboxPlaceFeature[];
}

/**
 * Search for places via the backend proxy. The Mapbox token is only used on the server.
 * No API key is sent to or visible in the browser.
 */
export async function searchPlaces(
  query: string,
  options: { limit?: number } = {}
): Promise<MapboxPlaceFeature[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const base = getApiBaseUrl();
  const limit = Math.min(Math.max(options.limit ?? 5, 1), 10);
  const url = `${base.replace(/\/$/, "")}/api/v1/utils/places/search?q=${encodeURIComponent(trimmed)}&limit=${limit}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Place search failed: ${res.status}`);
  }

  const data = (await res.json()) as PlacesSearchResponse;
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
