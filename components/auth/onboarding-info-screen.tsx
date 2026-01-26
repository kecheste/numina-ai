"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { SoulMapIcon } from "../icons/soul-map";
import { PersonalityIcon } from "../icons/personality";
import { AstrologyIcon } from "../icons/astrology";
import { ChakraIcon } from "../icons/chakra";
import { ReactNode } from "react";

interface OnboardingInfoScreenProps {
  userName: string;
  onStartTest: () => void;
}

export function OnboardingInfoScreen({
  userName,
  onStartTest,
}: OnboardingInfoScreenProps) {
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
          px-[32px]
          sm:px-[59px]
          pb-12
        "
      >
        {/* Logo */}
        <div className="flex justify-center my-10">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-bold text-white text-center mb-2"
        >
          What You’ll Receive
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4 place-items-center">
          <InfoCard
            icon={<SoulMapIcon />}
            text="A preview of your unique Soul Map"
          />
          <InfoCard
            icon={<PersonalityIcon />}
            text="Insight into personality & strengths"
          />
          <InfoCard
            icon={<AstrologyIcon />}
            text="Astrological & numerological highlights"
          />
          <InfoCard
            icon={<ChakraIcon />}
            text="Chakra balance & energetic alignment"
          />
        </div>

        {/* Extra info */}
        <div
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-center text-[15px] opacity-[0.8] font-light text-white mb-4"
        >
          <p className="mb-1">Want more?</p>
          <p>Unlock your full profile anytime to reveal</p>
          <p>💼 Career & relationship guidance</p>
          <p>🧬 Deeper psychological layers</p>
          <p>🌀 Past life & karmic insights</p>
          <p className="mt-3">All in just a few minutes</p>
        </div>

        {/* CTA */}
        <Button
          onClick={onStartTest}
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
              bg-[#F2D08C]
              text-black
              rounded-[10px]
              text-[21px]
              transition-colors
              mb-auto
            "
        >
          Let’s start
        </Button>

        {/* Footer */}
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "22px",
          }}
          className="text-[10px] font-light text-[#6b7280] text-center"
        >
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

function InfoCard({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="border border-[#F2D08CE0] rounded-[16px] w-[150px] h-[165px] p-4 flex flex-col items-center gap-3 text-center">
      {icon}
      <p
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "17px",
        }}
        className="text-[15px] text-white opacity-[0.8]"
      >
        {text}
      </p>
    </div>
  );
}
