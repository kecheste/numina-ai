"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";

interface WelcomeScreenProps {
  onStartJourney: () => void;
  onLogin?: () => void;
}

export function WelcomeScreen({ onStartJourney, onLogin }: WelcomeScreenProps) {
  return (
    <div className="flex items-center justify-center bg-white px-0 sm:px-4 h-screen overflow-hidden">
      <div
        className="
          w-full
          h-screen
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          overflow-y-auto
          sm:overflow-hidden
          flex
          flex-col
          items-center
          text-center
          px-[62px]
          sm:px-[59px]
          pt-10
          pb-12
        "
      >
        {/* Logo */}
        <div className="flex items-center justify-center mt-auto">
          <NuminaLogoIcon />
        </div>

        {/* Tagline */}
        <p
          className="text-[21px] text-white mt-12 sm:mt-[70px]"
          style={{
            fontFamily: "var(--font-fangsong)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
        >
          Discover your unique soul map. Powered by AI, psychology & mysticism.
        </p>

        {/* CTA */}
        <div className="w-full mb-[130px] pt-[135px]">
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
              h-[60px]
              sm:h-[67px]
              bg-[#F2D08CE0]
              text-black
              rounded-[10px]
              text-[18px]
              sm:text-[21px]
              transition-colors
            "
          >
            Start Your Journey
          </Button>
          {onLogin && (
            <p className="text-xs text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onLogin}
                className="text-[#F2D08C] hover:text-[#F2D08CC0 font-medium transition-colors"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
