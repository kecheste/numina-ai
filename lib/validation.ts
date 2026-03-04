/**
 * Shared validation helpers for auth and birth-data forms.
 * Keep in sync with backend rules where applicable.
 */

/** Full name must be "Firstname Lastname" (at least two words, each word at least 2 chars). */
const FULL_NAME_MIN_WORDS = 2;
const FULL_NAME_MIN_WORD_LENGTH = 2;

export function validateFullName(value: string): { valid: boolean; message?: string } {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, message: "Full name is required." };
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length < FULL_NAME_MIN_WORDS)
    return { valid: false, message: "Please enter first and last name (e.g. John Doe)." };
  const bad = parts.find((p) => p.length < FULL_NAME_MIN_WORD_LENGTH);
  if (bad)
    return { valid: false, message: "Each name part must be at least 2 characters." };
  if (trimmed.length > 255) return { valid: false, message: "Name is too long." };
  return { valid: true };
}

/** Email: standard format. */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(value: string): { valid: boolean; message?: string } {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, message: "Email is required." };
  if (!EMAIL_REGEX.test(trimmed)) return { valid: false, message: "Please enter a valid email address." };
  return { valid: true };
}

/** Password: at least 8 characters. */
const PASSWORD_MIN_LENGTH = 8;

export function validatePassword(value: string): { valid: boolean; message?: string } {
  if (value.length < PASSWORD_MIN_LENGTH)
    return { valid: false, message: "Password must be at least 8 characters." };
  return { valid: true };
}

/** Time of birth: 24h format HH:mm, hours 0–23, minutes 0–59. Empty is valid (optional). */
const TIME_24_REGEX = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;

export function validateTimeOfBirth(value: string): { valid: boolean; message?: string } {
  const trimmed = value.trim();
  if (!trimmed) return { valid: true };
  if (!TIME_24_REGEX.test(trimmed))
    return { valid: false, message: "Use 24-hour format (e.g. 14:30). Hours 0–23, minutes 0–59." };
  return { valid: true };
}

/** Max day in month for a given year (1-31). */
export function getDaysInMonth(year: number, month: number): number {
  const d = new Date(year, month, 0);
  return d.getDate();
}
