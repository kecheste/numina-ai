export interface BirthData {
  dateOfBirth: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthTime: string;
  birthPlace: string;
}

const SESSION_KEYS = {
  dateOfBirth: "register_dob",
  birthYear: "register_birth_year",
  birthMonth: "register_birth_month",
  birthDay: "register_birth_day",
  birthTime: "register_birth_time",
  birthPlace: "register_birth_place",
} as const;

export function saveBirthDataToSession(data: BirthData): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEYS.dateOfBirth, data.dateOfBirth);
  sessionStorage.setItem(SESSION_KEYS.birthYear, data.birthYear);
  sessionStorage.setItem(SESSION_KEYS.birthMonth, data.birthMonth);
  sessionStorage.setItem(SESSION_KEYS.birthDay, data.birthDay);
  sessionStorage.setItem(SESSION_KEYS.birthTime, data.birthTime);
  sessionStorage.setItem(SESSION_KEYS.birthPlace, data.birthPlace);
}

export function getBirthDataFromSession(): BirthData | null {
  if (typeof window === "undefined") return null;
  const dateOfBirth = sessionStorage.getItem(SESSION_KEYS.dateOfBirth);
  if (!dateOfBirth) return null;
  return {
    dateOfBirth,
    birthYear: sessionStorage.getItem(SESSION_KEYS.birthYear) ?? "",
    birthMonth: sessionStorage.getItem(SESSION_KEYS.birthMonth) ?? "",
    birthDay: sessionStorage.getItem(SESSION_KEYS.birthDay) ?? "",
    birthTime: sessionStorage.getItem(SESSION_KEYS.birthTime) ?? "",
    birthPlace: sessionStorage.getItem(SESSION_KEYS.birthPlace) ?? "",
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
