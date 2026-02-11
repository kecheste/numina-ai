"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "../navigation/app-drawer";

interface TestResultStarseedViewProps {
  testTitle: string;
  onBack: () => void;
}

const INTRO_TEXT =
  "You came from the stars to bring structure to chaos. Your presence is calming, your mind crystalline. You often feel like you don't fully belong — and yet, your frequency helps the world return to balance.";

const SUBTITLE = "The Architect of Harmony";

const TRAITS = [
  { key: "Mind", value: "Visionary, precise" },
  { key: "Heart", value: "Detached but kind" },
  { key: "Soul", value: "Ancient and clear" },
  { key: "Shadow", value: "Rigid, avoids mess" },
] as const;

const SIGNATURE_GIFT =
  "You hold the rare ability to design harmony into everything you touch — from ideas to emotions to space.";

const CHALLENGES = [
  "Struggles with chaos",
  "Hard to soften perfectionism",
  "May avoid emotions",
];

const TRY_ITEMS = ["Nature walks", "daily routines", "body awareness"];

const AVOID_ITEMS = ["Mental overstimulation", "ignoring your body"];

const SYNCHRONICITIES = [
  { label: "Life Path 7", description: "Mystic, seeker, spiritual insight" },
  { label: "INFJ", description: "Intuitive and visionary" },
  {
    label: "Scorpio Sun",
    description: "Intensifies emotional & intuitive energy",
  },
];

export function TestResultStarseedView({
  testTitle,
  onBack,
}: TestResultStarseedViewProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  const displayTitle = testTitle.toLowerCase().includes("starseed")
    ? "Starseed Origin: Arcturian"
    : testTitle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto"
      >
        {/* Top Bar */}
        <div className="sticky top-0 flex items-center justify-between w-full bg-black px-[24px] py-2 border-b border-gray-800/30 z-10">
          <button onClick={onBack} className="cursor-pointer p-1">
            <Icon icon="icons8:left-arrow" color="#D9D9D9" width={24} />
          </button>
          <NuminaLogoIcon />
          <AppDrawer
            isPremium={false}
            portalContainer={shellRef}
            onLogout={() => {}}
          />
        </div>

        <div className="px-[24px] py-6 pb-12">
          {/* Title */}
          <div className="text-center mb-4">
            <h1
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[21px] font-[400] text-white mb-1"
            >
              {displayTitle}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-gotham)",
              }}
              className="text-[13px] font-[300] text-[#F2D08C]"
            >
              {SUBTITLE}
            </p>
          </div>

          <div className="pl-1 border-l-2 border-[#F2D08C] mb-6 text-left">
            <p
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "20px",
              }}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              {INTRO_TEXT}
            </p>
          </div>

          {/* Traits Cluster */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-3"
            >
              Traits Cluster
            </h3>
            <div className="space-y-1.5">
              {TRAITS.map(({ key, value }) => (
                <p
                  key={key}
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "20px",
                  }}
                  className="text-[13px] font-[300] text-[#FFFFFF]"
                >
                  <span className="font-[600] text-[#F2D08C]">{key}:</span>{" "}
                  {value}
                </p>
              ))}
            </div>
          </div>

          {/* Signature Gift */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-2"
            >
              Signature Gift
            </h3>
            <p
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "20px",
              }}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              {SIGNATURE_GIFT}
            </p>
          </div>

          {/* Challenges to Watch */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-3"
            >
              Challenges to Watch
            </h3>
            <div className="flex flex-wrap gap-2">
              {CHALLENGES.map((item, idx) => (
                <span
                  key={idx}
                  className="border border-[#FFFFFF]/50 rounded-[7px] px-2 h-[17px] flex items-center"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "12px",
                  }}
                >
                  <span className="text-[12px] font-[300] text-[#FFFFFF]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Try */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-3"
            >
              Try
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRY_ITEMS.map((item, idx) => (
                <span
                  key={idx}
                  className="border border-[#FFFFFF]/50 rounded-[7px] px-2 h-[17px] flex items-center"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "12px",
                  }}
                >
                  <span className="text-[12px] font-[300] text-[#FFFFFF]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Avoid */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-3"
            >
              Avoid
            </h3>
            <div className="flex flex-wrap gap-2">
              {AVOID_ITEMS.map((item, idx) => (
                <span
                  key={idx}
                  className="border border-[#FFFFFF]/50 rounded-[7px] px-2 h-[17px] flex items-center"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "12px",
                  }}
                >
                  <span className="text-[12px] font-[300] text-[#FFFFFF]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Synchronicities */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-3"
            >
              Synchronicities
            </h3>
            <div className="space-y-2">
              {SYNCHRONICITIES.map(({ label, description }) => (
                <p
                  key={label}
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "20px",
                  }}
                  className="text-[13px] font-[300] text-[#FFFFFF]"
                >
                  <span className="font-[600] text-[#FFFFFF]">{label}</span>
                  <span className="text-[#F2D08C] mx-1">→</span>
                  {description}
                </p>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-6 text-left">
            <h3
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "24px",
              }}
              className="text-[15px] font-[600] text-white mb-3"
            >
              Full Description
            </h3>
            <div className="pl-2 border-l-2 border-[#F2D08C66] space-y-3">
              <p
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "20px",
                }}
                className="text-[13px] font-[300] text-[#FFFFFF]"
              >
                {INTRO_TEXT}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-gotham)",
                  lineHeight: "20px",
                }}
                className="text-[13px] font-[300] text-[#FFFFFF]"
              >
                {INTRO_TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
