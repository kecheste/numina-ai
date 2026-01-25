import localFont from "next/font/local";

export const gotham = localFont({
  src: [
    {
      path: "../public/fonts/Gotham Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gotham Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gotham Medium.otf",
      weight: "350",
      style: "normal",
    },
    {
      path: "../public/fonts/Gotham Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
  display: "swap",
});

export const arp80 = localFont({
  src: "../public/fonts/ARP-80.ttf",
  variable: "--font-arp80",
  weight: "400",
  display: "swap",
});

export const fangsong = localFont({
  src: "../public/fonts/Adobe Fangsong Std R.otf",
  variable: "--font-fangsong",
  weight: "400",
  display: "swap",
});
