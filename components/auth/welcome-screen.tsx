"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WelcomeScreenProps {
  onStartJourney: () => void;
}

export function WelcomeScreen({ onStartJourney }: WelcomeScreenProps) {
  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 min-h-screen">
      <div
        className="
          w-full
          h-screen
          sm:h-auto
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          overflow-hidden
          flex
          flex-col
          items-center
          text-center
          px-[32px]
          sm:px-[59px]
        "
      >
        <div className="flex items-center justify-center mt-[200px] sm:mt-[248px]">
          <Image src="/logo.png" width={191} height={44} alt="logo" />
        </div>

        <p
          className="text-[21px] text-white mt-[60px] sm:mt-[70px]"
          style={{
            fontFamily: "var(--font-fangsong)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
        >
          Discover your unique soul map. Powered by AI, psychology & mysticism.
        </p>

        <div className="w-full mt-auto mb-[48px] sm:mt-[135px] sm:mb-0">
          <Button
            onClick={onStartJourney}
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="
              cursor-pointer
              hover:bg-[#F2D08CC0]
              w-full
              h-[67px]
              bg-[#F2D08CE0]
              text-black
              rounded-[10px]
              text-[21px]
              transition-colors
              mb-[130px]
              sm:mb-0
            "
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
