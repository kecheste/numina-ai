"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { Icon } from "@iconify/react";
import { AppDrawer } from "../navigation/app-drawer";
import { InfjIcon } from "../icons/mysoul/infj";
import { SunIcon } from "../icons/sun-icon";
import { MoonIcon } from "../icons/moon-icon";
import { RisingIcon } from "../icons/rising-icon";

interface TestResultsProps {
  testTitle: string;
  category: string;
  onClose: () => void;
  resultData?: {
    personalityType: string;
    insights: string[];
    recommendations: string[];
    score: number;
  } | null;
}

const GOLD = "#F2D08C";

export function TestResults({ onClose }: TestResultsProps) {
  const [step, setStep] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        className="
          relative
          w-full
          h-full
          sm:h-auto
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          overflow-y-auto
          flex
          flex-col
        "
      >
        {step === 0 && <IntroScreen onNext={handleNext} />}
        {step === 1 && (
          <PersonalityTypeScreen onNext={handleNext} shellRef={shellRef} />
        )}
        {step === 2 && (
          <AstrologicalBlueprintScreen
            onNext={handleNext}
            shellRef={shellRef}
          />
        )}
        {step === 3 && (
          <NumerologyBlueprintScreen onNext={handleNext} shellRef={shellRef} />
        )}
      </div>
    </div>
  );
}

// Screen 1: Intro - Discover Your Cognitive Blueprint
function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center text-center h-full px-[32px]  pb-12">
      {/* Logo */}
      <div className="flex justify-center mb-12 mt-4">
        <NuminaLogoIcon />
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "33px",
        }}
        className="text-[18px] font-[300] text-[#FFFFFF] mb-6"
      >
        Discover Your Cognitive Blueprint
      </h1>

      {/* Main Description */}
      <p
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "19px",
        }}
        className="text-[12px] font-[300] text-[#F2D08C] mb-6"
      >
        This quick personality test is based on the MBTI framework. It helps us
        understand how you process information, make decisions, and interact
        with the world. Your result will be used to align future insights in
        your Soul Map — from relationships to purpose.
      </p>

      {/* Secondary Description */}
      <p
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "19px",
        }}
        className="text-[13px] font-[300] text-[#FFFFFF] px-12"
      >
        You'll get a basic result now, and the{"\n"}option to dive deeper later.
      </p>

      {/* Continue Button */}
      <Button
        onClick={onNext}
        style={{
          fontFamily: "var(--font-arp80)",
          fontWeight: 400,
          lineHeight: "33px",
        }}
        className="cursor-pointer mt-[100px] mb-auto hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
      >
        Continue
      </Button>
    </div>
  );
}

// Screen 2: Your Personality Type
function PersonalityTypeScreen({
  onNext,
  shellRef,
}: {
  onNext: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}) {
  const traits = [
    "You recharge alone, but care deeply about others",
    "You think ahead, looking for connections and meaning",
    "You're a mix of logic and emotional intelligence",
    "You prefer plans, but value integrity over control",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30">
        <div className="w-10" />
        <NuminaLogoIcon />
        <AppDrawer
          isPremium={false}
          portalContainer={shellRef}
          onLogout={() => {}}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-6 pb-12">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[400] text-white mb-3"
        >
          Your Personality Type
        </h1>

        {/* Type Badge */}
        <div
          className="border border-[#F2D08C] rounded-[16px] px-4  mb-5 h-[32px]"
          style={{ fontFamily: "var(--font-gotham)" }}
        >
          <span className="text-[#F2D08C] text-[21px] font-[300]">
            INFJ – The Advocate
          </span>
        </div>

        {/* Icon */}
        <div className="mb-5">
          <InfjIcon />
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "21px",
          }}
          className="text-[14px] font-[350] text-[#FFFFFF] mb-6 px-2"
        >
          Thoughtful, visionary, and driven by deeper meaning — INFJs are
          introspective idealists who combine empathy with structure. You likely
          seek purpose, harmony, and impact in both work and relationships.
        </p>

        {/* What this says about you */}
        <h2
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[400] text-[#F2D08C] mb-4"
        >
          What this says about you
        </h2>

        {/* Traits */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {traits.map((trait, idx) => (
            <div
              key={idx}
              className="border border-[#F2D08C]/50 rounded-[8px] px-3 h-[27px]"
              style={{ fontFamily: "var(--font-gotham)" }}
            >
              <span className="text-[12px] font-[300] text-[#F2D08C]">
                {trait}
              </span>
            </div>
          ))}
        </div>

        {/* Next Step Button */}
        <Button
          onClick={onNext}
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mb-auto mt-[70px] hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

// Screen 3: Your Astrological Blueprint
function AstrologicalBlueprintScreen({
  onNext,
  shellRef,
}: {
  onNext: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30">
        <div className="w-10" />
        <NuminaLogoIcon />
        <AppDrawer
          isPremium={false}
          portalContainer={shellRef}
          onLogout={() => {}}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-6 pb-12 overflow-y-auto">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[300] text-[#FFFFFF] mb-2"
        >
          Your Astrological Blueprint
        </h1>

        <p
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "21px",
          }}
          className="text-[14px] font-[350] text-[#FFFFFF] mb-8"
        >
          The sky at the moment of your birth reveals powerful patterns that
          shape your life
        </p>

        {/* Sun Sign */}
        <div className="grid grid-cols-5 gap-2 w-full text-left mb-3">
          <div className="col-span-1">
            <SunIcon />
          </div>
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[15px] font-[350] text-[#FFFFFF] mb-0.5"
            >
              Sun Sign
            </h3>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Core personality: Intense, intuitive, transformative
            </p>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              You're driven by depth, truth, and emotional mastery. You rarely
              settle for surface-level anything.
            </p>
          </div>
        </div>

        {/* Moon Sign */}
        <div className="grid grid-cols-5 gap-2 w-full text-left mb-3">
          <div className="col-span-1">
            <MoonIcon />
          </div>
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[14px] font-[400] text-white mb-0.5"
            >
              Moon Sign
            </h3>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Emotional self: [e.g. Sensitive, nurturing, private]
            </p>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Your inner world is shaped by your moon sign, revealing how you
              process feelings and seek comfort.
            </p>
          </div>
        </div>

        {/* Rising Sign */}
        <div className="grid grid-cols-5 gap-2 w-full text-left mb-4">
          <div className="col-span-1">
            <RisingIcon />
          </div>
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[14px] font-[400] text-white mb-0.5"
            >
              Rising Sign
            </h3>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              How others see you: [e.g. Magnetic, mysterious, calm]
            </p>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[13px] font-[400] text-[#F2D08C] mb-0.5"
            >
              Your rising sign reflects your outward vibe — the way you move
              through the world and first impressions.
            </p>
          </div>
        </div>

        {/* Cosmic Traits Summary */}
        <div className="grid grid-cols-5 gap-2 w-full text-left mt-2 mb-4">
          <div className="col-span-1" />
          <div className="col-span-4">
            <h3
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
              className="text-[21px] font-[400] text-[#F2D08C] mb-2"
            >
              Cosmic Traits Summary:
            </h3>
            <div
              className="space-y-0.5"
              style={{ fontFamily: "var(--font-gotham)", lineHeight: "21px" }}
            >
              <p className="text-[13px] font-[350] text-white">
                △ Element: [Water / Earth / Fire / Air]
              </p>
              <p className="text-[13px] font-[350] text-white">
                ♂ Modality: [Fixed / Mutable / Cardinal]
              </p>
              <p className="text-[13px] font-[350] text-white">
                ♇ Ruling Planet: [Pluto, etc.]
              </p>
              <p className="text-[13px] font-[350] text-white">
                🏠 Most active house: [e.g. 7th – Partnerships]
              </p>
            </div>
          </div>
        </div>

        {/* Next Step Button */}
        <Button
          onClick={onNext}
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mb-auto mt-[10px] hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors flex-shrink-0"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

// Screen 4: Your Numerology Blueprint
function NumerologyBlueprintScreen({
  onNext,
  shellRef,
}: {
  onNext: () => void;
  shellRef: React.RefObject<HTMLDivElement | null>;
}) {
  const numerologyData = [
    {
      number: "4",
      title: "Life Path",
      description:
        "You are a grounded builder. Practical, determined, structured",
    },
    {
      number: "7",
      title: "Expression",
      description:
        "You express wisdom and seek inner truth. Deep thinker, reflective",
    },
    {
      number: "6",
      title: "Soul Urge",
      description: "You long for harmony, love, and nurturing relationships",
    },
    {
      number: "15",
      title: "Birthday",
      description: "Creative and versatile. You bring charm and dynamic energy",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30">
        <div className="w-10" />
        <NuminaLogoIcon />
        <AppDrawer
          isPremium={false}
          portalContainer={shellRef}
          onLogout={() => {}}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center flex-1 px-[32px] pt-8 pb-12">
        <h1
          style={{
            fontFamily: "var(--font-gotham)",
            lineHeight: "33px",
          }}
          className="text-[21px] font-[300] text-[#FFFFFF] mb-8"
        >
          Your Numerology Blueprint
        </h1>

        {/* Numerology Items */}
        <div className="w-full space-y-6 mb-6">
          {numerologyData.map((item, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-2 w-full text-left">
              <div className="col-span-1 flex items-center justify-center">
                <span
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[58px] font-[400] text-white"
                >
                  {item.number}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span className="text-[#FFFFFF] text-[48px] font-[300]">→</span>
              </div>
              <div className="col-span-4">
                <h3
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[15px] font-[400] text-[#FFFFFF] mb-0.5"
                >
                  {item.title}
                </h3>
                <p
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[13px] font-[350] text-[#F2D08C]"
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Step Button */}
        <Button
          onClick={onNext}
          style={{
            fontFamily: "var(--font-arp80)",
            fontWeight: 400,
            lineHeight: "33px",
          }}
          className="cursor-pointer mt-[150px] mb-auto hover:bg-[#F2D08CC0] w-full h-[60px] bg-[#F2D08CE0] text-[#000000] rounded-[10px] font-[400] text-[18px] transition-colors"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
