"use client";

import Link from "next/link";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center w-full px-[35px] sm:px-[36px] pt-12 pb-12">
      <div className="flex justify-center mb-12">
        <NuminaLogoIcon />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "40px",
          }}
          className="text-[32px] font-bold text-[#F2D08C] mb-4"
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "28px",
          }}
          className="text-[20px] font-medium text-white mb-6"
        >
          A Path Unseen
        </h2>

        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "24px",
          }}
          className="text-[15px] font-light text-[#9ca3af] max-w-[300px] mb-12"
        >
          It seems your journey has led you to a place that doesn't exist. Let us guide you back to your true path.
        </p>

        <Link href="/home" className="w-full">
          <Button
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="
              w-full
              h-[60px]
              sm:h-[67px]
              bg-[#F2D08CE0]
              hover:bg-[#F2D08CC0]
              text-black
              rounded-[10px]
              text-[18px]
              sm:text-[21px]
              transition-colors
            "
          >
            Return Home
          </Button>
        </Link>
      </div>

      <p
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "22px",
        }}
        className="text-[12px] font-light text-white/40 mt-auto"
      >
        &copy; {new Date().getFullYear()} Numina. All rights reserved.
      </p>
    </div>
  );
}
