"use client";

import { useRef } from "react";
import { CHAKRA_COLORS } from "@/lib/constants/keys";
import AppBar from "@/components/navigation/appBar";
import { useRouter } from "next/navigation";
import { TestResultResponse } from "@/lib/api-client";

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
  content?: TestResultResponse | null;
}

function normalizeChakras(raw: unknown): ChakraAlignmentChakra[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
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
      out.push();
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
  if (!Array.isArray(raw)) return [];
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

  const statusSummary = content?.llm_result_json?.statusSummary?.trim();
  const chakras =
    content?.llm_result_json?.chakras?.length === 7
      ? content?.llm_result_json?.chakras
      : normalizeChakras(content?.llm_result_json?.chakras);
  const strengths = normalizeStrings(content?.llm_result_json?.strengths, []);
  const challenges = normalizeStrings(content?.llm_result_json?.challenges, []);
  const synchronicities = content?.llm_result_json?.synchronicities?.length
    ? content?.llm_result_json?.synchronicities
    : normalizeSynchronicities(content?.llm_result_json?.synchronicities);
  const coreTraits = normalizeStrings(content?.llm_result_json?.coreTraits, []);
  const tryThis = normalizeStrings(content?.llm_result_json?.tryThis, []);
  const avoidThis = normalizeStrings(content?.llm_result_json?.avoidThis, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col pt-2"
      >
        <AppBar
          handleBack={onBack}
          handleLogout={() => router.push("/welcome")}
          shellRef={shellRef}
        />

        <div className="flex flex-col px-[32px] pt-6 pb-12 flex-1 overflow-y-auto">
          <div className="text-center mb-4">
            <h1
              style={{
                fontFamily: "var(--font-gotham)",
                lineHeight: "33px",
              }}
              className="text-[21px] font-[400] text-white"
            >
              Checkra Alignment Scan
            </h1>
          </div>

          <p
            style={bodyTextStyle}
            className="text-[13px] font-[300] text-[#F2D08C] mb-2"
          >
            Your Result
          </p>

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

          {content?.llm_result_json?.summary && (
            <>
              <h3
                className="text-[18px] text-center font-[400] text-[#F2D08C] mb-2"
                style={{
                  lineHeight: "33px",
                  fontFamily: "var(--font-gotham)",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Your Energy Balance
              </h3>
              <div
                className="flex flex-col text-left gap-6 text-[13px] font-[300] text-white/90 mb-6"
                style={{ lineHeight: "20px", fontFamily: "var(--font-gotham)" }}
              >
                {content?.llm_result_json?.summary
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
            <ul
              style={bodyTextStyle}
              className="text-[13px] list-disc font-[300] text-[#FFFFFF] pl-5"
            >
              {tryThis?.length > 0 &&
                tryThis.map((item: string) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="mb-6 text-left">
            <h2 style={sectionHeadingStyle} className={sectionHeadingClass}>
              Avoid this
            </h2>
            <ul
              style={bodyTextStyle}
              className="text-[13px] list-disc pl-5 font-[300] text-[#FFFFFF]"
            >
              {avoidThis.length >= 2 &&
                avoidThis?.map((avoid: string) => <li key={avoid}>{avoid}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
