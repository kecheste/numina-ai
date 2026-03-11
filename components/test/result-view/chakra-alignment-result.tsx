"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { NuminaLogoIcon } from "@/components/icons/logo/numina-normal";
import { AppDrawer } from "@/components/navigation/app-drawer";
import { Button } from "@/components/ui/button";
import { CHAKRA_COLORS } from "@/lib/constants/keys";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";

export interface ChakraAlignmentChakra {
  id: string;
  name: string;
  status: string;
  description: string;
  tryItems?: string | null;
  avoidItems?: string | null;
}

export interface ChakraAlignmentContent {
  statusSummary?: string | null;
  chakras?: ChakraAlignmentChakra[] | null;
  strengths?: string[] | null;
  challenges?: string[] | null;
  synchronicities?:
    | {
        label?: string;
        description?: string;
        test?: string;
        connection?: string;
      }[]
    | null;
  coreTraits?: string[] | null;
  tryThis?: string[] | null;
  avoidThis?: string[] | null;
  summary?: string | null;
}

interface ChakraAlignmentResultProps {
  testTitle: string;
  onBack: () => void;
  content?: ChakraAlignmentContent | null;
}

const DEFAULT_CHAKRAS: ChakraAlignmentChakra[] = [
  {
    id: "root",
    name: "Root Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "solarPlexus",
    name: "Solar Plexus Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "heart",
    name: "Heart Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "throat",
    name: "Throat Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "thirdEye",
    name: "Third Eye Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
  {
    id: "crown",
    name: "Crown Chakra",
    status: "Balanced",
    description: "This energy center is in balance.",
    tryItems: null,
    avoidItems: null,
  },
];

const DEFAULT_STRENGTHS = ["Self-awareness", "Willingness to explore"];
const DEFAULT_CHALLENGES = ["Patience", "Integration"];
const DEFAULT_SYNCHRONICITIES: { label: string; description: string }[] = [];
const DEFAULT_CORE_TRAITS = ["Reflective", "Growing"];
const DEFAULT_TRY_THIS = [
  "Revisit your answers as you grow.",
  "Explore more tests for a fuller picture.",
];
const DEFAULT_AVOID_THIS = [
  "Rushing to conclusions.",
  "Comparing yourself to others.",
];
const DEFAULT_STATUS_SUMMARY =
  "Your chakra balance reflects your current energy flow.";

function normalizeChakras(raw: unknown): ChakraAlignmentChakra[] {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_CHAKRAS;
  const out: ChakraAlignmentChakra[] = [];
  const ids = [
    "root",
    "sacral",
    "solarPlexus",
    "heart",
    "throat",
    "thirdEye",
    "crown",
  ];
  const names = [
    "Root Chakra",
    "Sacral Chakra",
    "Solar Plexus Chakra",
    "Heart Chakra",
    "Throat Chakra",
    "Third Eye Chakra",
    "Crown Chakra",
  ];
  for (let i = 0; i < 7; i++) {
    const c = raw[i];
    if (c && typeof c === "object" && "id" in c) {
      const id = String((c as Record<string, unknown>).id ?? ids[i]);
      out.push({
        id: ids.includes(id) ? id : ids[i],
        name: String((c as Record<string, unknown>).name ?? names[i]),
        status: String((c as Record<string, unknown>).status ?? "Balanced"),
        description: String(
          (c as Record<string, unknown>).description ??
            "This energy center is in balance.",
        ),
        tryItems:
          (c as Record<string, unknown>).tryItems != null
            ? String((c as Record<string, unknown>).tryItems)
            : null,
        avoidItems:
          (c as Record<string, unknown>).avoidItems != null
            ? String((c as Record<string, unknown>).avoidItems)
            : null,
      });
    } else {
      out.push(
        DEFAULT_CHAKRAS[i] ?? {
          id: ids[i],
          name: names[i],
          status: "Balanced",
          description: "This energy center is in balance.",
          tryItems: null,
          avoidItems: null,
        },
      );
    }
  }
  return out;
}

function normalizeStrings(raw: unknown, fallback: string[]): string[] {
  if (!Array.isArray(raw)) return fallback;
  return raw.map((x) => (x != null ? String(x) : "")).filter(Boolean);
}

function normalizeSynchronicities(
  raw: unknown,
): { label: string; description: string }[] {
  if (!Array.isArray(raw)) return DEFAULT_SYNCHRONICITIES;
  return raw
    .filter(
      (s): s is Record<string, unknown> => s != null && typeof s === "object",
    )
    .map((s) => ({
      label: String(s.label ?? s.test ?? ""),
      description: String(s.description ?? s.connection ?? ""),
    }))
    .filter((s) => s.label || s.description)
    .slice(0, 6);
}

const sectionHeadingClass = "text-[15px] font-[350] text-white mb-2";
const sectionHeadingStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "33px",
} as const;

const bodyTextStyle = {
  fontFamily: "var(--font-gotham)",
  lineHeight: "18px",
};

export function ChakraAlignmentResult({
  testTitle: _testTitle,
  onBack,
  content,
}: ChakraAlignmentResultProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  console.log(content)

  const statusSummary =
    content?.statusSummary?.trim() || DEFAULT_STATUS_SUMMARY;
  const chakras =
    content?.chakras?.length === 7
      ? content.chakras
      : normalizeChakras(content?.chakras);
  const strengths = normalizeStrings(content?.strengths, DEFAULT_STRENGTHS);
  const challenges = normalizeStrings(content?.challenges, DEFAULT_CHALLENGES);
  const synchronicities = content?.synchronicities?.length
    ? content.synchronicities
    : normalizeSynchronicities(content?.synchronicities);
  const coreTraits = normalizeStrings(content?.coreTraits, DEFAULT_CORE_TRAITS);
  const tryThis = normalizeStrings(content?.tryThis, DEFAULT_TRY_THIS);
  const avoidThis = normalizeStrings(content?.avoidThis, DEFAULT_AVOID_THIS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto"
      >
        <AppBar
          handleBack={onBack}
          handleLogout={() => router.push("/welcom")}
          shellRef={shellRef}
        />

        <div className="px-[24px] pt-4 pb-12">
          <div className="text-center mb-4">
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
              {statusSummary}
            </p>
          </div>

          {chakras.map((chakra) => {
            const color = CHAKRA_COLORS[chakra.id] ?? "#F2D08C";
            const showTryAvoid =
              chakra.status !== "Balanced" &&
              (chakra.tryItems || chakra.avoidItems);
            return (
              <div key={chakra.id} className="mb-6 text-left">
                <span
                  className="inline-block border rounded-[7px] px-2.5 mb-2 h-[20px]"
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

          {content?.summary && (
            <>
              <h3
                className="text-[18px] text-center font-[400] text-[#F2D08C] mb-2"
                style={{ 
                    lineHeight: "33px", 
                    fontFamily: "var(--font-gotham)",
                    fontSize: "13px",
                    fontWeight: 600
                  }}
              >
                Your Blueprint
              </h3>
              <div
                className="flex flex-col text-left gap-6 text-[13px] font-[300] text-white/90 mb-6"
                style={{ lineHeight: "20px", fontFamily: "var(--font-gotham)", }}
              >
                {content?.summary
                  .replace(/\\n/g, "\n")
                  .split("\n")
                  .filter((line) => line.trim().length > 0)
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph.trim()}</p>
                  ))}
              </div>
            </>
          )}

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Strengths
            </h2>
            <div className="flex flex-wrap gap-2">
              {strengths.map((item, idx) => (
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

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Challenges
            </h2>
            <div className="flex flex-wrap gap-2">
              {challenges.map((item, idx) => (
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

          {synchronicities.length > 0 && (
            <div className="mb-6 text-left">
              <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
                Synchronicities
              </h2>
              <div className="space-y-2">
                {synchronicities.map(({ label, description }, idx) => (
                  <p
                    key={label || idx}
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
          )}

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Core Traits
            </h2>
            <div className="flex flex-wrap gap-2">
              {coreTraits.map((item, idx) => (
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

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Try This
            </h2>
            <p
              style={bodyTextStyle}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              {tryThis.length >= 2 ? (
                <>
                  <span className="underline">{tryThis[0]}</span>
                  <span className="mx-1">or</span>
                  <span className="underline">{tryThis[1]}</span>
                </>
              ) : (
                (tryThis[0] ?? "Revisit your answers as you grow.")
              )}
            </p>
          </div>

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Avoid this
            </h2>
            <p
              style={bodyTextStyle}
              className="text-[13px] font-[300] text-[#FFFFFF]"
            >
              {avoidThis.length >= 2 ? (
                <>
                  <span className="underline">{avoidThis[0]}</span>
                  <span className="mx-1">or</span>
                  <span className="underline">{avoidThis[1]}</span>
                </>
              ) : (
                (avoidThis[0] ?? "Rushing to conclusions.")
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
