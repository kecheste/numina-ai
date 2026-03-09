"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "../navigation/app-drawer";
import PageLoader from "../custom/loader";
import type { TestResultResponse } from "@/lib/api-client";

interface TestResultViewProps {
  testId: number;
  testTitle: string;
  category: string;
  onBack: () => void;
  result?: TestResultResponse | null;
}

function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((x) => (typeof x === "string" ? x : String(x)));
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const normalized = trimmed.replace(/'/g, '"');
        const parsed = JSON.parse(normalized);
        if (Array.isArray(parsed)) {
          return parsed.map((x) => (typeof x === "string" ? x : String(x)));
        }
      } catch {}
    }
    return [trimmed];
  }
  return [];
}

function ensureSynchronicities(
  value: unknown,
): { test: string; connection: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (x): x is Record<string, unknown> => x != null && typeof x === "object",
    )
    .map((x) => ({
      test: typeof x.test === "string" ? x.test : String(x.test ?? ""),
      connection:
        typeof x.connection === "string"
          ? x.connection
          : String(x.connection ?? ""),
    }))
    .filter((s) => s.test || s.connection);
}

const testResultsData: Record<
  number,
  {
    subtitle: string;
    mainResult: string;
    description: string;
    coreTraits: string[];
    strengths: string[];
    challenges: string[];
    spiritualInsight: string;
    tryThis?: string[];
    avoidThis?: string[];
    chartData: {
      number: string;
      title: string;
      line2: string;
      line3: string;
    }[];
    synchronicities: { test: string; connection: string }[];
  }
> = {
  1: {
    subtitle: "Your Astrological Profile",
    mainResult: "Scorpio Sun",
    description:
      "You're driven by depth, truth, and emotional mastery. You rarely settle for surface-level anything.",
    coreTraits: [
      "Intense",
      "Intuitive",
      "Transformative",
      "Private",
      "Magnetic",
    ],
    strengths: [
      "Deeply perceptive",
      "Natural investigator",
      "Emotionally resilient",
    ],
    challenges: [
      "Can become secretive",
      "May struggle with trust",
      "Tendency to hold grudges",
    ],
    spiritualInsight:
      "Your path isn't about material success — it's about discovering inner truth and living in alignment with your soul. You're here to understand the mystery behind the visible world.",
    chartData: [
      {
        number: "♏",
        title: "Sun Sign",
        line2: "Core identity",
        line3: "intense and transformative",
      },
      {
        number: "♍",
        title: "Moon Sign",
        line2: "Emotional self",
        line3: "analytical and nurturing",
      },
      {
        number: "♒",
        title: "Rising Sign",
        line2: "How others see you",
        line3: "mysterious and magnetic",
      },
    ],
    synchronicities: [
      { test: "MBTI (INFJ)", connection: "both seek truth & meaning" },
      {
        test: "Chakra Profile",
        connection: "intuition linked to Third Eye activation",
      },
      {
        test: "Numerology",
        connection: "Life Path 7 echoes the seeker energy",
      },
    ],
  },
  2: {
    subtitle: "Your Life Path Number",
    mainResult: "7 - The Seeker",
    description:
      "You're a deep thinker, always seeking wisdom beneath the surface of life.",
    coreTraits: [
      "Introspective",
      "Analytical",
      "Spiritual",
      "Private",
      "Intuitive",
    ],
    strengths: [
      "Deeply reflective and wise",
      "Natural philosopher or mystic",
      "High intuition",
      "Independent mindset",
    ],
    challenges: [
      "Can become isolated or emotionally distant",
      "May struggle to trust others or express vulnerability",
      "Tendency to overanalyze",
    ],
    spiritualInsight:
      "Your path isn't about material success — it's about discovering inner truth and living in alignment with your soul. You're here to understand the mystery behind the visible world and guide others through your insight.",
    chartData: [
      {
        number: "5",
        title: "Soul Urge",
        line2: "What your heart craves",
        line3: "freedom, movement, adventure.",
      },
      {
        number: "5",
        title: "Personality",
        line2: "What people see in you",
        line3: "dynamic, quick, playful",
      },
      {
        number: "6",
        title: "Birthday",
        line2: "Extra energy from the day you were born",
        line3: "nurturer, beauty lover.",
      },
    ],
    synchronicities: [
      { test: "MBTI (INFJ)", connection: "both seek truth & meaning" },
      {
        test: "Chakra Profile",
        connection: "intuition linked to Third Eye activation",
      },
      {
        test: "Astrological Profile",
        connection: "your Scorpio sun echoes the 7's intensity",
      },
    ],
  },
  // MBTI Type (ID: 7)
  7: {
    subtitle: "Your MBTI Type",
    mainResult: "INFJ - The Advocate",
    description:
      "Thoughtful, visionary, and driven by deeper meaning — INFJs are introspective idealists who combine empathy with structure.",
    coreTraits: [
      "Intuitive",
      "Empathetic",
      "Private",
      "Visionary",
      "Determined",
    ],
    strengths: [
      "Deep emotional intelligence",
      "Strong moral compass",
      "Creative problem solver",
      "Inspiring leader",
    ],
    challenges: [
      "Prone to burnout",
      "Can be overly idealistic",
      "Difficulty with criticism",
    ],
    spiritualInsight:
      "You're here to guide and heal others through your unique combination of insight and compassion. Your purpose lies in making the invisible visible.",
    chartData: [
      {
        number: "Ni",
        title: "Dominant Function",
        line2: "Introverted Intuition",
        line3: "seeing patterns and possibilities",
      },
      {
        number: "Fe",
        title: "Auxiliary Function",
        line2: "Extraverted Feeling",
        line3: "harmonizing with others",
      },
      {
        number: "Ti",
        title: "Tertiary Function",
        line2: "Introverted Thinking",
        line3: "logical analysis",
      },
    ],
    synchronicities: [
      {
        test: "Numerology",
        connection: "Life Path 7 mirrors your seeking nature",
      },
      {
        test: "Chakra Profile",
        connection: "Crown Chakra activation aligns with intuition",
      },
      {
        test: "Astrological Profile",
        connection: "Water signs resonate with emotional depth",
      },
    ],
  },
  // Chakra Assessment Scan (ID: 13)
  13: {
    subtitle: "Your Chakra Alignment",
    mainResult: "Third Eye Dominant",
    description:
      "Your energy flows most freely through your Third Eye Chakra, indicating heightened intuition and inner vision.",
    coreTraits: [
      "Spiritually attuned",
      "Intuitive",
      "Reflective",
      "Connected",
      "Wise",
    ],
    strengths: [
      "Strong spiritual connection",
      "Access to higher guidance",
      "Natural healer",
      "Transcendent perspective",
    ],
    challenges: [
      "May feel disconnected from physical world",
      "Root Chakra needs grounding",
      "Can become overly ethereal",
    ],
    spiritualInsight:
      "Your Third Eye activation suggests you're in a phase of spiritual awakening. Balance this with grounding practices to integrate insights into daily life.",
    chartData: [
      {
        number: "7",
        title: "Crown",
        line2: "Active",
        line3: "spiritual connection and universal consciousness",
      },
      {
        number: "6",
        title: "Third Eye",
        line2: "Most active",
        line3: "intuition, insight, and inner vision",
      },
      {
        number: "4",
        title: "Heart",
        line2: "Balanced",
        line3: "love, compassion, and emotional connection",
      },
      {
        number: "3",
        title: "Root",
        line2: "Needs attention",
        line3: "grounding and stability",
      },
    ],
    synchronicities: [
      {
        test: "MBTI (INFJ)",
        connection: "intuitive nature supports Third Eye activation",
      },
      {
        test: "Numerology",
        connection: "Life Path 7 aligns with spiritual seeking",
      },
      {
        test: "Astrological Profile",
        connection: "Neptune influence amplifies intuition",
      },
    ],
  },
};

// Default fallback data
const defaultResult = {
  subtitle: "Your Result",
  mainResult: "The Seeker",
  description:
    "You have a unique profile that combines multiple aspects of self-discovery.",
  coreTraits: ["Intuitive", "Reflective", "Growth-oriented"],
  strengths: ["Self-aware", "Open to learning", "Emotionally intelligent"],
  challenges: ["May overthink", "Can be too self-critical"],
  spiritualInsight:
    "Your journey is about continuous growth and self-discovery. Trust the process.",
  tryThis: [
    "Revisit your answers as you grow.",
    "Explore more tests for a fuller picture.",
  ],
  avoidThis: ["Rushing to conclusions.", "Comparing yourself to others."],
  chartData: [] as {
    number: string;
    title: string;
    line2: string;
    line3: string;
  }[],
  synchronicities: [] as { test: string; connection: string }[],
};

export function TestResultView({
  testId,
  testTitle,
  category,
  onBack,
  result: apiResult,
}: TestResultViewProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const mockResult = testResultsData[testId] || defaultResult;
  const llm = apiResult?.llm_result_json;
  const result: {
    subtitle: string;
    mainResult: string;
    description: string;
    coreTraits: string[];
    strengths: string[];
    challenges: string[];
    spiritualInsight: string;
    tryThis: string[];
    avoidThis: string[];
    chartData: {
      number: string;
      title: string;
      line2: string;
      line3: string;
    }[];
    synchronicities: { test: string; connection: string }[];
  } = apiResult
    ? {
        subtitle: "Your Result",
        mainResult:
          llm?.title ?? apiResult.personality_type ?? mockResult.mainResult,
        description:
          (llm?.summary && llm.summary.trim()) ||
          (apiResult.narrative && apiResult.narrative.trim()) ||
          mockResult.description,
        coreTraits:
          ensureStringArray(llm?.coreTraits ?? apiResult.insights).length > 0
            ? ensureStringArray(llm?.coreTraits ?? apiResult.insights)
            : mockResult.coreTraits,
        strengths:
          ensureStringArray(llm?.strengths ?? apiResult.insights).length > 0
            ? ensureStringArray(llm?.strengths ?? apiResult.insights)
            : mockResult.strengths,
        challenges:
          ensureStringArray(llm?.challenges ?? apiResult.recommendations)
            .length > 0
            ? ensureStringArray(llm?.challenges ?? apiResult.recommendations)
            : mockResult.challenges,
        spiritualInsight:
          (llm?.spiritualInsight && llm.spiritualInsight.trim()) ||
          mockResult.spiritualInsight,
        tryThis: ensureStringArray(llm?.tryThis),
        avoidThis: ensureStringArray(llm?.avoidThis),
        chartData: (Array.isArray(llm?.chartData)
          ? llm.chartData
          : mockResult.chartData) as typeof mockResult.chartData,
        synchronicities:
          ensureSynchronicities(llm?.synchronicities).length > 0
            ? ensureSynchronicities(llm?.synchronicities)
            : mockResult.synchronicities,
      }
    : {
        ...mockResult,
        tryThis: mockResult.tryThis ?? defaultResult.tryThis,
        avoidThis: mockResult.avoidThis ?? defaultResult.avoidThis,
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4 min-h-dvh overflow-hidden">
      <div
        ref={shellRef}
        className="
          w-full
          relative
          h-dvh 
          sm:h-auto
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          flex
          flex-col
          items-center
          text-center
          pt-2
          pb-4
          overflow-hidden
        "
      >
        <PageLoader>
          <div className="flex items-center border-b justify-between w-full bg-black pb-4 px-[24px] z-40 shrink-0">
            <button onClick={onBack} className="cursor-pointer ">
              <Icon
                icon="icons8:left-arrow"
                color="#D9D9D9"
                width={30}
                className="mt-1.5"
              />
            </button>
            <NuminaLogoIcon />
            <AppDrawer
              isPremium={false}
              portalContainer={shellRef}
              onLogout={() => {}}
            />
          </div>

          <div className="px-[24px] py-6 pb-12 flex-1 overflow-y-scroll">
            <div className="text-center">
              <h1
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[21px] font-[400] text-white mb-1"
              >
                {testTitle}
              </h1>
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[13px] font-[300] text-[#F2D08C]"
              >
                {result.subtitle}
              </p>
            </div>

            <div className="text-center">
              <h2
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[21px] font-[400] text-white mb-1"
              >
                {result.mainResult}
              </h2>
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[13px] font-[300] text-[#FFFFFF] mt-2 px-4"
              >
                {result.description}
              </p>
            </div>

            {/* Core Traits */}
            <div className="text-left my-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[15px] font-[350] text-white"
              >
                Core Traits
              </h3>
              <div className="flex flex-wrap gap-1">
                {result.coreTraits.map((trait: string, idx: number) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[17px]"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "12px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-[#F2D08C]">
                      {trait}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="text-left mb-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "33px" }}
                className="text-[15px] font-[350] text-white"
              >
                Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((strength: string, idx: number) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[17px]"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "12px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-[#F2D08C]">
                      {strength}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="text-left mb-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "24px" }}
                className="text-[15px] font-[600] text-white mb-3"
              >
                Challenges
              </h3>
              <div className="flex flex-wrap gap-2">
                {result?.challenges?.map((challenge: string, idx: number) => (
                  <span
                    key={idx}
                    className="border border-[#F2D08C]/50 rounded-[7px] px-2 h-[17px]"
                    style={{
                      fontFamily: "var(--font-gotham)",
                      lineHeight: "12px",
                    }}
                  >
                    <span className="text-[12px] font-[300] text-white">
                      {challenge}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="text-left mb-4">
              <h3
                style={{ fontFamily: "var(--font-gotham)", lineHeight: "24px" }}
                className="text-[15px] font-[600] text-white mb-1"
              >
                Spiritual Insight
              </h3>
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[13px] font-[300] text-white"
              >
                {result.spiritualInsight}
              </p>
            </div>

            {result.tryThis && result.tryThis.length > 0 && (
              <div className="text-left mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "24px",
                  }}
                  className="text-[15px] font-[600] text-white mb-2"
                >
                  Try This
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {result.tryThis.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      style={{ fontFamily: "var(--font-gotham)" }}
                      className="text-[13px] font-[300] text-[#F2D08C]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.avoidThis && result.avoidThis.length > 0 && (
              <div className="text-left mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "24px",
                  }}
                  className="text-[15px] font-[600] text-white mb-2"
                >
                  Avoid This
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {result.avoidThis.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      style={{ fontFamily: "var(--font-gotham)" }}
                      className="text-[13px] font-[300] text-white/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.chartData.length > 0 && (
              <div className="text-left mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "24px",
                  }}
                  className="text-[15px] font-[600] text-white mb-1"
                >
                  {testTitle} in Your Chart
                </h3>
                <div className="space-y-3">
                  {result.chartData.map((item, idx) => (
                    <div key={idx}>
                      <p
                        style={{ fontFamily: "var(--font-gotham)" }}
                        className="text-[14px] font-[400] text-[#F2D08C]"
                      >
                        {item.number} {item.title}
                      </p>
                      <p
                        style={{ fontFamily: "var(--font-gotham)" }}
                        className="text-[13px] font-[300] text-[#F2D08C]"
                      >
                        {item.line2}
                      </p>
                      <p
                        style={{ fontFamily: "var(--font-gotham)" }}
                        className="text-[13px] font-[400] text-[#F2D08C] italic"
                      >
                        {item.line3}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.synchronicities.length > 0 && (
              <div className="text-left mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "24px",
                  }}
                  className="text-[15px] font-[600] text-white mb-1"
                >
                  Synchronicities
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-gotham)",
                    lineHeight: "20px",
                  }}
                  className="text-[12px] font-[300] text-[#FFFFFF]"
                >
                  This Life Path overlaps with your:
                </p>
                <div className="space-y-2">
                  {result.synchronicities.map(
                    (
                      sync: { test: string; connection: string },
                      idx: number,
                    ) => (
                      <p
                        key={idx}
                        style={{
                          fontFamily: "var(--font-gotham)",
                        }}
                        className="text-[13px] font-[300] text-white"
                      >
                        • <span className="font-[600]">{sync.test}</span>:{" "}
                        {sync.connection}
                      </p>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </PageLoader>
      </div>
    </div>
  );
}
