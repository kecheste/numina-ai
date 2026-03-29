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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{ fontFamily: "var(--font-gotham)" }}
    className="text-[14px] font-[400] text-[#F2D08C] uppercase tracking-[0.1em] mb-4"
  >
    {children}
  </h3>
);

const Divider = () => <div className="w-full h-px bg-white/10 my-8" />;

const ChipList = ({ items, gold }: { items: string[]; gold?: boolean }) => {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="border border-[#F2D08C]/40 rounded-[4px] px-3 py-1 flex items-center"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "18px" }}
        >
          <span
            className={`text-[12px] font-normal ${gold ? "text-[#F2D08C]" : "text-white/90"}`}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  );
};

const ParagraphBlock = ({ text }: { text?: string | null }) => {
  if (!text) return null;
  const paragraphs = text
    .replace(/\\n/g, "\n")
    .split("\n")
    .filter((p) => p.trim().length > 0);
  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "22px" }}
          className="text-[13px] font-normal text-white/90"
        >
          {p.trim()}
        </p>
      ))}
    </div>
  );
};

interface InsightCardProps {
  label: string;
  value: string;
  isGrowth?: boolean;
}

const InsightCard = ({ label, value, isGrowth }: InsightCardProps) => (
  <div className="flex flex-col gap-2 p-4 rounded-[4px] bg-white/[0.03] border border-white/10 w-full mb-4">
    <p
      style={{ fontFamily: "var(--font-gotham)" }}
      className={`text-[11px] font-normal tracking-wider ${isGrowth ? "text-[#F2D08C]" : "text-white/40"}`}
    >
      {label}
    </p>
    <p
      style={{ fontFamily: "var(--font-gotham)" }}
      className="text-[13px] font-normal italic text-white/90 leading-relaxed"
    >
      "{value}"
    </p>
  </div>
);

const EnergyCard = ({ chakra }: { chakra: ChakraAlignmentChakra }) => {
  const color = CHAKRA_COLORS[chakra.id] ?? "#F2D08C";
  const isImbalanced = chakra.status !== "Balanced" && chakra.status !== "Open";

  return (
    <div
      className="flex gap-4 w-full mb-8 group"
      style={{ fontFamily: "var(--font-gotham)" }}
    >
      <div
        className="w-[2px] rounded-full"
        style={{ backgroundColor: color }}
      />

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-[14px] font-normal text-white">{chakra.name}</h4>
          <span
            className="text-[11px] font-normal uppercase tracking-widest px-2 py-0.5"
            style={{
              color: isImbalanced ? "#F2D08C" : "#FFFFFF",
              fontFamily: "var(--font-gotham)",
            }}
          >
            {chakra.status}
          </span>
        </div>

        <p className="text-[13px] font-normal text-white/60 leading-relaxed mb-3">
          {chakra.description}
        </p>

        {isImbalanced && (chakra.tryItems || chakra.avoidItems) && (
          <div className="border-t border-white/5 pt-3 space-y-3 mt-1">
            {chakra.tryItems && (
              <div className="flex flex-col gap-0.5">
                <span
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[10px] font-normal text-[#F2D08C] uppercase tracking-wider"
                >
                  Daily focus
                </span>
                <p
                  style={{ fontFamily: "var(--font-gotham)" }}
                  className="text-[12px] font-normal text-white/80 leading-relaxed italic"
                >
                  "{chakra.tryItems}"
                </p>
              </div>
            )}
            {chakra.avoidItems && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-normal text-white/30 uppercase tracking-wider">
                  Notice this habit
                </span>
                <p className="text-[12px] font-normal text-white/60 leading-relaxed italic">
                  "{chakra.avoidItems}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function normalizeChakras(raw: unknown): ChakraAlignmentChakra[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
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
    "Root",
    "Sacral",
    "Solar Plexus",
    "Heart",
    "Throat",
    "Third Eye",
    "Crown",
  ];

  return ids.map((id, i) => {
    const c = raw.find((item: any) =>
      item?.id?.toLowerCase().includes(id.toLowerCase()),
    );
    return {
      id,
      name: (c as any)?.name || `${names[i]} Chakra`,
      status: (c as any)?.status || "Balanced",
      description:
        (c as any)?.description ||
        "Your energy is flowing normally through this center.",
      tryItems: (c as any)?.tryItems || null,
      avoidItems: (c as any)?.avoidItems || null,
    };
  });
}

const ensureArray = (val: any) =>
  Array.isArray(val) ? val.filter(Boolean) : [];

export function ChakraAlignmentResult({
  onBack,
  content,
}: {
  onBack: () => void;
  content?: TestResultResponse | null;
}) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);

  const llm = content?.llm_result_json ?? {};

  const strongestChakra = llm.strongestChakra;
  const needsRebalancing = llm.needsRebalancing;
  const statusSummary = llm.statusSummary || "";
  const chakras = normalizeChakras(llm.chakras);
  const narrative = llm.summary || "";

  const strengths = ensureArray(llm.strengths);
  const challenges = ensureArray(llm.challenges);
  const coreTraits = ensureArray(llm.coreTraits);
  const tryThis = ensureArray(llm.tryThis);
  const avoidThis = ensureArray(llm.avoidThis);
  const synch = ensureArray(llm.synchronicities);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4"
      style={{ fontFamily: "var(--font-gotham)" }}
    >
      <div
        ref={shellRef}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto flex flex-col pt-2"
        style={{ scrollbarWidth: "none" }}
      >
        <AppBar
          handleBack={onBack}
          handleLogout={() => router.push("/welcome")}
          shellRef={shellRef}
        />

        <div className="px-[24px] pt-8 pb-16 flex-1 overflow-y-auto text-left">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[20px] mb-2 font-normal text-white leading-tight"
            >
              Chakra Alignment Scan
            </h1>
            <p
              style={{ fontFamily: "var(--font-gotham)" }}
              className="text-[11px] font-normal text-[#F2D08C] tracking-[0.2em] mb-2"
            >
              Your Result
            </p>
          </div>

          {/* Top Insights */}
          {(strongestChakra || needsRebalancing) && (
            <div className="flex flex-col gap-2 mb-6">
              {strongestChakra && (
                <InsightCard label="Primary Strength" value={strongestChakra} />
              )}
              {needsRebalancing && (
                <InsightCard
                  label="Growth Priority"
                  value={needsRebalancing}
                  isGrowth
                />
              )}
            </div>
          )}

          {/* Status Summary */}
          {statusSummary && (
            <div className="mb-10">
              <p
                style={{ fontFamily: "var(--font-gotham)" }}
                className="text-[13px] font-normal text-white/90 leading-relaxed italic border-l border-[#F2D08C]/40 pl-5 py-2"
              >
                {statusSummary}
              </p>
            </div>
          )}

          <Divider />

          {/* Energy Stack Visualization */}
          <SectionTitle>Individual Centers</SectionTitle>
          <div className="flex flex-col gap-2">
            {chakras.map((chakra) => (
              <EnergyCard key={chakra.id} chakra={chakra} />
            ))}
          </div>

          <Divider />

          {/* Deeper Narrative */}
          {narrative && (
            <>
              <SectionTitle>Energy Patterns</SectionTitle>
              <ParagraphBlock text={narrative} />
              <Divider />
            </>
          )}

          {/* Chips: Traits & Profile */}
          {coreTraits.length > 0 && (
            <>
              <SectionTitle>Core Traits</SectionTitle>
              <ChipList items={coreTraits} gold />
              <Divider />
            </>
          )}

          {strengths.length > 0 && (
            <>
              <SectionTitle>Top Strengths</SectionTitle>
              <ChipList items={strengths} gold />
              <Divider />
            </>
          )}

          {challenges.length > 0 && (
            <>
              <SectionTitle>Current Frictions</SectionTitle>
              <ChipList items={challenges} />
              <Divider />
            </>
          )}

          {/* Actions */}
          {tryThis.length > 0 && (
            <>
              <SectionTitle>Try This:</SectionTitle>
              <ul className="flex flex-col gap-5 list-disc pl-5">
                {tryThis.map((item: any, idx) => (
                  <li key={idx} className="text-white/80">
                    <p className="text-[13px] font-normal leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
              <Divider />
            </>
          )}

          {avoidThis.length > 0 && (
            <>
              <SectionTitle>Avoid This:</SectionTitle>
              <ul className="flex flex-col gap-5 list-disc pl-5">
                {avoidThis.map((item: any, idx) => (
                  <li key={idx} className="text-white/60">
                    <p className="text-[13px] font-normal leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Synchronicity */}
          {synch.length > 0 && (
            <>
              <Divider />
              <SectionTitle>Synchronicities</SectionTitle>
              <div className="flex flex-col gap-5">
                {synch.map((s: any, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <p className="text-[13px] font-normal text-[#F2D08C] uppercase tracking-wider">
                      {s.label || s.test}
                    </p>
                    <p className="text-[13px] font-normal text-white/70 leading-relaxed italic">
                      "{s.description || s.connection}"
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
