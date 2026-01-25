"use client";

import Image from "next/image";
import { Button } from "../ui/button";

interface OnboardingInfoScreenProps {
  userName: string;
  onStartTest: () => void;
}

export function OnboardingInfoScreen({
  userName,
  onStartTest,
}: OnboardingInfoScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black border border-[#1f1f1f] px-[54px] py-10 flex flex-col">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="NuminaAI" width={180} height={40} />
        </div>

        {/* Title */}
        <h1 className="text-[20px] font-[600] text-white text-center mb-8">
          What You’ll Receive
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <InfoCard
            icon="/vectors/soul-map.png"
            text="A preview of your unique Soul Map"
          />
          <InfoCard
            icon="/vectors/personality.png"
            text="Insight into personality & strengths"
          />
          <InfoCard
            icon="/vectors/astrology.png"
            text="Astrological & numerological highlights"
          />
          <InfoCard
            icon="/vectors/chakra.png"
            text="Chakra balance & energetic alignment"
          />
        </div>

        {/* Extra info */}
        <div className="text-center text-[15px] font-[100] text-[#FFFFFF] mb-10">
          <p className="mb-1">Want more?</p>
          <p>Unlock your full profil anytime to reveal</p>
          <p>📦 Career & relationship guidance</p>
          <p>🧠 Deeper psychological layers</p>
          <p>🌀 Past life & karmic insights</p>
          <p className="mt-3">All in just a few minutes</p>
        </div>

        {/* CTA */}
        <Button
          onClick={onStartTest}
          className="cursor-pointer mt-[39px] hover:bg-[#F2D08CC0] w-full h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors text-base"
        >
          Let’s start
        </Button>

        {/* Footer */}
        <p className="mt-6 text-[11px] text-[#6b7280] text-center">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

function InfoCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="border border-[#F2D08CE0] rounded-[16px] w-[150px] h-[165px] p-4 flex flex-col items-center text-center">
      <Image
        src={icon}
        alt=""
        width={40}
        height={50}
        className="mb-4 object-fit max-w-[60px]"
      />
      <p className="text-[13px] text-[#e5e7eb] leading-[1.5]">{text}</p>
    </div>
  );
}
