import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getZodiacSign(
  month: number | null | undefined,
  day: number | null | undefined,
): string {
  if (month == null || day == null) return "";
  const d = month * 100 + day;
  if (d >= 1222 || d <= 119) return "Capricorn";
  if (d <= 218) return "Aquarius";
  if (d <= 320) return "Pisces";
  if (d <= 419) return "Aries";
  if (d <= 520) return "Taurus";
  if (d <= 620) return "Gemini";
  if (d <= 722) return "Cancer";
  if (d <= 822) return "Leo";
  if (d <= 922) return "Virgo";
  if (d <= 1022) return "Libra";
  if (d <= 1121) return "Scorpio";
  return "Sagittarius";
}

export function getFirstName(name: string | null | undefined): string {
  if (!name?.trim()) return "";
  return name.trim().split(/\s+/)[0] ?? "";
}
