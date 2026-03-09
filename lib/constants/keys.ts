import { MBTIType } from "../types/types";

export const MBTI_SUMMARY: Record<MBTIType, string> = {
  INTJ: "Architect",
  INTP: "Logician",
  ENTJ: "Commander",
  ENTP: "Debater",
  INFJ: "Advocate",
  INFP: "Mediator",
  ESTJ: "Executive",
  ESFJ: "Consul",
  ENFJ: "Protagonist",
  ISFJ: "Defender",
  ISTJ: "Logistician",
  ISFP: "Adventurer",
  ESFP: "Entertainer",
  ESTP: "Entrepreneur",
  ISTP: "Virtuoso",
};

export const ZODIAC_SUMMARY: Record<string, string> = {
  Aries: "Bold and fearless, always ready to lead the charge.",
  Taurus: "Grounded and loyal, steady in love and ambition.",
  Gemini: "Curious and quick-minded, thriving on ideas.",
  Cancer: "Deeply intuitive, protective, and emotionally wise.",
  Leo: "Radiant and expressive, leading with heart and fire.",
  Virgo: "Precise and thoughtful, devoted to meaningful service.",
  Libra: "Charming and diplomatic, seeking harmony and beauty.",
  Scorpio: "Intense and transformative, drawn to hidden truths.",
  Sagittarius: "Adventurous and optimistic, chasing wisdom.",
  Capricorn: "Disciplined and ambitious, building lasting success.",
  Aquarius: "Visionary and unconventional, shaping the future.",
  Pisces: "Compassionate and dreamy, flowing with imagination.",
};

export const MOST_SURE_DEFAULT_TAGS = [
  "Goals-oriented and disciplined",
  "Connected to the earth",
  "Deeply empathetic",
  "You are a Visionary Empath",
];

export const CHAKRA_COLORS: Record<string, string> = {
  root: "#C62828",
  sacral: "#EF6C00",
  solarPlexus: "#F9A825",
  heart: "#2E7D32",
  throat: "#1565C0",
  thirdEye: "#6A1B9A",
  crown: "#F2D08C",
};
