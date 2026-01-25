import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        gotham: ["var(--font-gotham)"],
        arp: ["var(--font-arp80)"],
        fangsong: ["var(--font-fangsong)"],
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
};

export default config;
