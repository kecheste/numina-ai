"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "../navigation/app-drawer";

interface TestResultChakraViewProps {
  testTitle: string;
  onBack: () => void;
}

// Chakra colors (border/text for name pill)
const CHAKRA_COLORS: Record<string, string> = {
  root: "#C62828",
  sacral: "#EF6C00",
  solarPlexus: "#F9A825",
  heart: "#2E7D32",
  throat: "#1565C0",
  thirdEye: "#6A1B9A",
  crown: "#F2D08C",
};

const CHAKRA_STATUS_INTRO =
  "You are spiritually tuned but may lack grounding. Your Crown Chakra is overactive, while your Root Chakra is blocked, creating an energetic imbalance.";

const CHAKRAS = [
  {
    id: "root",
    name: "Root Chakra",
    status: "Blocked",
    description: "You may feel anxious, ungrounded, or unstable.",
    tryItems: "nature walks, grounding foods, physical routines",
    avoidItems: "chaos, skipping meals, constant stimulation",
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    status: "Balanced",
    description:
      "You express emotions well and enjoy sensory and creative experiences. You are emotionally fluid and open.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "solarPlexus",
    name: "Solar Plexus Chakra",
    status: "Slightly Blocked",
    description:
      "There might be hesitation to assert yourself or take leadership.",
    tryItems: "making decisions, building confidence",
    avoidItems: "excessive self-doubt or passivity",
  },
  {
    id: "heart",
    name: "Heart Chakra",
    status: "Balanced",
    description:
      "You're compassionate, emotionally open, and able to love deeply.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "throat",
    name: "Throat Chakra",
    status: "Balanced",
    description:
      "You communicate clearly, authentically, and know when to listen.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "thirdEye",
    name: "Third Eye Chakra",
    status: "Open",
    description:
      'Strong intuition and inner knowing. You often trust your "gut" and can see beyond surface appearances.',
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "crown",
    name: "Crown Chakra",
    status: "Overactive",
    description:
      "You may be too focused on spiritual ideals or abstract thinking.",
    tryItems: "grounding meditation, focusing on the body",
    avoidItems: "overthinking, spiritual escapism",
  },
];

const STRENGTHS = [
  "Deep spiritual insight",
  "Emotional expression",
  "Intuitive awareness",
];

const CHALLENGES = [
  "Disconnection from body or routine",
  'Hard to feel "present" in the now',
  "May overthink instead of act",
];

const SYNCHRONICITIES = [
  { label: "Life Path 7", description: "Mystic, seeker, spiritual insight" },
  { label: "INFJ", description: "Intuitive and visionary" },
  {
    label: "Scorpio Sun",
    description: "Intensifies emotional & intuitive energy",
  },
];

const CORE_TRAITS = ["Deep thinker", "Empathic", "Needs solitude"];

const TRY_THIS = ["Take solo nature walks", "Practice grounding breathwork"];
const AVOID_THIS = ["Don't isolate for too long", "Watch for escapism"];

const sectionHeadingClass = "text-[15px] font-[350] text-white mb-2";
const sectionHeadingStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "33px",
} as const;

const bodyTextStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "100%",
};

export function TestResultChakraView({
  testTitle,
  onBack,
}: TestResultChakraViewProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto"
      >
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
          <div className="text-center mb-6">
            <h1
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[21px] font-[400] text-white"
            >
              Chakras
            </h1>
          </div>

          <div className="mb-4 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Chakra status
            </h2>
            <p
              style={bodyTextStyle}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              You are spiritually tuned but may lack grounding. Your{" "}
              <span className="font-[600] text-[#FFFFFF]">Crown Chakra</span> is
              overactive, while your{" "}
              <span className="font-[600] text-[#FFFFFF]">Root Chakra</span> is{" "}
              <span className="font-[600] text-[#FFFFFF]">blocked</span>,
              creating an energetic imbalance.
            </p>
          </div>

          {CHAKRAS.map((chakra) => {
            const color = CHAKRA_COLORS[chakra.id] ?? "#F2D08C";
            const showTryAvoid =
              chakra.status !== "Balanced" &&
              (chakra.tryItems || chakra.avoidItems);
            return (
              <div key={chakra.id} className="mb-6 text-left">
                <span
                  className="inline-block border rounded-[7px] px-2.5 mb-2 h-[18px]"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#fff",
                    borderColor: color,
                    paddingBottom: "2px",
                  }}
                >
                  {chakra.name}
                </span>
                <p
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-[#FFFFFF] mb-1"
                >
                  Status: {chakra.status}
                </p>
                <p
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-[#FFFFFF] mb-2"
                >
                  {chakra.description}
                </p>
                {showTryAvoid && (
                  <div className="space-y-1">
                    {chakra.tryItems && (
                      <p
                        style={bodyTextStyle}
                        className="text-[13px] font-[300] text-[#FFFFFF]"
                      >
                        <span className="font-[600]">Try:</span>{" "}
                        {chakra.tryItems}
                      </p>
                    )}
                    {chakra.avoidItems && (
                      <p
                        style={bodyTextStyle}
                        className="text-[13px] font-[300] text-[#FFFFFF]"
                      >
                        <span className="font-[600]">Avoid:</span>{" "}
                        {chakra.avoidItems}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Strengths
            </h2>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map((item, idx) => (
                <span
                  key={idx}
                  className="border border-[#F2D08C]/50 rounded-[7px] px-2 py-1 flex items-center"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "16px",
                  }}
                >
                  <span className="text-[12px] font-[300] text-[#F2D08C]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Challenges
            </h2>
            <div className="flex flex-wrap gap-2">
              {CHALLENGES.map((item, idx) => (
                <span
                  key={idx}
                  className="border border-[#F2D08C]/50 rounded-[7px] px-2 py-1 flex items-center"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "16px",
                  }}
                >
                  <span className="text-[12px] font-[300] text-[#F2D08C]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Synchronicities */}
          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Synchronicities
            </h2>
            <div className="space-y-2">
              {SYNCHRONICITIES.map(({ label, description }) => (
                <p
                  key={label}
                  style={bodyTextStyle}
                  className="text-[13px] font-[300] text-[#FFFFFF]"
                >
                  <span className="font-[600] text-[#FFFFFF]">{label}</span>
                  <span className="text-[#F2D08C] mx-1">→</span>
                  {description}
                </p>
              ))}
            </div>
          </div>

          {/* Core Traits */}
          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Core Traits
            </h2>
            <div className="flex flex-wrap gap-2">
              {CORE_TRAITS.map((item, idx) => (
                <span
                  key={idx}
                  className="border border-[#F2D08C]/50 rounded-[7px] px-2 py-1 flex items-center"
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "16px",
                  }}
                >
                  <span className="text-[12px] font-[300] text-[#F2D08C]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Try This */}
          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Try This
            </h2>
            <p
              style={bodyTextStyle}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              <span className="underline">{TRY_THIS[0]}</span>
              <span className="mx-1">or</span>
              <span className="underline">{TRY_THIS[1]}</span>
            </p>
          </div>

          {/* Avoid this */}
          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Avoid this
            </h2>
            <p
              style={bodyTextStyle}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              <span className="underline">{AVOID_THIS[0]}</span>
              <span className="mx-1">or</span>
              <span className="underline">{AVOID_THIS[1]}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
