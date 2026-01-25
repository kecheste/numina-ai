"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WelcomeScreenProps {
  onStartJourney: () => void;
}

export function WelcomeScreen({ onStartJourney }: WelcomeScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[450px] aspect-[9/20] bg-black overflow-hidden flex flex-col justify-center items-center p-6 text-center gap-8">
        <div className="flex items-center justify-center gap-2 mt-[100px]">
          <Image src={"/logo.png"} width={191} height={44} alt="logo" />
        </div>

        <p className="font-[200] mx-[20px] text-[21px] text-[#FFFFFF] mt-[70px]">
          Discover your unique soul map. Powered by AI, psychology & mysticism.
        </p>

        <div className="w-full mt-[135px]">
          <Button
            onClick={onStartJourney}
            className="cursor-pointer hover:bg-[#F2D08CC0] w-[309px] h-[67px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[21px] transition-colors text-base"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
