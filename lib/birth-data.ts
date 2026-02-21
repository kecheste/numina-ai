export interface BirthData {
  dateOfBirth: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthTime: string;
  birthPlace: string;
  /** From Mapbox + geo-tz when user selects a place. */
  birthPlaceLat?: number | null;
  birthPlaceLng?: number | null;
  birthPlaceTimezone?: string | null;
}

const SESSION_KEYS = {
  dateOfBirth: "register_dob",
  birthYear: "register_birth_year",
  birthMonth: "register_birth_month",
  birthDay: "register_birth_day",
  birthTime: "register_birth_time",
  birthPlace: "register_birth_place",
  birthPlaceLat: "register_birth_place_lat",
  birthPlaceLng: "register_birth_place_lng",
  birthPlaceTimezone: "register_birth_place_timezone",
} as const;

export function saveBirthDataToSession(data: BirthData): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEYS.dateOfBirth, data.dateOfBirth);
  sessionStorage.setItem(SESSION_KEYS.birthYear, data.birthYear);
  sessionStorage.setItem(SESSION_KEYS.birthMonth, data.birthMonth);
  sessionStorage.setItem(SESSION_KEYS.birthDay, data.birthDay);
  sessionStorage.setItem(SESSION_KEYS.birthTime, data.birthTime);
  sessionStorage.setItem(SESSION_KEYS.birthPlace, data.birthPlace);
  if (data.birthPlaceLat != null) {
    sessionStorage.setItem(SESSION_KEYS.birthPlaceLat, String(data.birthPlaceLat));
  } else {
    sessionStorage.removeItem(SESSION_KEYS.birthPlaceLat);
  }
  if (data.birthPlaceLng != null) {
    sessionStorage.setItem(SESSION_KEYS.birthPlaceLng, String(data.birthPlaceLng));
  } else {
    sessionStorage.removeItem(SESSION_KEYS.birthPlaceLng);
  }
  if (data.birthPlaceTimezone != null && data.birthPlaceTimezone !== "") {
    sessionStorage.setItem(SESSION_KEYS.birthPlaceTimezone, data.birthPlaceTimezone);
  } else {
    sessionStorage.removeItem(SESSION_KEYS.birthPlaceTimezone);
  }
}

export function getBirthDataFromSession(): BirthData | null {
  if (typeof window === "undefined") return null;
  const dateOfBirth = sessionStorage.getItem(SESSION_KEYS.dateOfBirth);
  if (!dateOfBirth) return null;
  const lat = sessionStorage.getItem(SESSION_KEYS.birthPlaceLat);
  const lng = sessionStorage.getItem(SESSION_KEYS.birthPlaceLng);
  const tz = sessionStorage.getItem(SESSION_KEYS.birthPlaceTimezone);
  const parsedLat = lat != null && lat !== "" ? parseFloat(lat) : NaN;
  const parsedLng = lng != null && lng !== "" ? parseFloat(lng) : NaN;
  return {
    dateOfBirth,
    birthYear: sessionStorage.getItem(SESSION_KEYS.birthYear) ?? "",
    birthMonth: sessionStorage.getItem(SESSION_KEYS.birthMonth) ?? "",
    birthDay: sessionStorage.getItem(SESSION_KEYS.birthDay) ?? "",
    birthTime: sessionStorage.getItem(SESSION_KEYS.birthTime) ?? "",
    birthPlace: sessionStorage.getItem(SESSION_KEYS.birthPlace) ?? "",
    birthPlaceLat: Number.isFinite(parsedLat) ? parsedLat : null,
    birthPlaceLng: Number.isFinite(parsedLng) ? parsedLng : null,
    birthPlaceTimezone: tz != null && tz !== "" ? tz : null,
  };
}

export function clearBirthDataFromSession(): void {
  if (typeof window === "undefined") return;
  Object.values(SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key));
}

export function hasBirthDataInSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEYS.dateOfBirth) !== null;
}
