"use client";

import { useEffect, useMemo, useState } from "react";
import {
  apiGetSynthesis,
  apiListTestResults,
  type SynthesisResponse,
} from "@/lib/api-client";
import { getTestUi } from "@/lib/constants/testUiMap";
import { TestCard } from "@/components/cards/test-card";
import { BluePrint } from "../test/components/Blueprint";
import { Patterns } from "../test/components/Patterns";
import { Strength } from "../test/components/Strength";
import { Challenge } from "../test/components/Challenge";
import { SpiritualInsight } from "../test/components/SpiritualInsight";
import { TryThis } from "../test/components/TryThis";
import { AvoidThis } from "../test/components/AvoidThis";

interface SynthesisPageProps {
  isPremium: boolean;
}

const TOTAL_TEST_COUNT = 24;

function SectionHeading({ label }: { label: string }) {
  return (
    <h2 className="font-[400] text-[15px] text-white pt-4 pb-1">{label}</h2>
  );
}

function PillList({
  items,
  color = "gold",
}: {
  items: string[];
  color?: "gold" | "silver" | "muted";
}) {
  const cls = {
    gold: "text-[#F2D08C] border-[#F2D08C]/50",
    silver: "text-[#D9D9D9] border-[#D9D9D9]/50",
    muted: "text-[#9ca3af] border-[#9ca3af]/50",
  }[color];
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {items.map((item, i) => (
        <span
          key={i}
          className={`${cls} border rounded-[10px] px-2 py-0.5 text-[12px] font-[300]`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function QuoteBlock({ text }: { text: string }) {
  return (
    <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-3 leading-relaxed">
      {text}
    </p>
  );
}

function PreviewSynthesis({ result }: { result: SynthesisResponse["result"] }) {
  return (
    <section className="space-y-1 px-[28px] text-left">
      {result.youAre && (
        <>
          <SectionHeading label="You Are" />
          <p className="text-[13px] font-[400] text-[#F2D08C]">
            {result.youAre}
          </p>
        </>
      )}
      {(result.sureThings?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="Sure Things" />
          <p className="text-[13px] font-[300] text-[#E7E7E7] leading-relaxed">
            {result.sureThings}
          </p>
        </>
      )}
      {result.identitySummary && (
        <>
          <SectionHeading label="Your Identity" />
          <QuoteBlock text={result.identitySummary} />
        </>
      )}
      {(result.growthAreas?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="Growth Areas" />
          <PillList items={result.growthAreas!} color="silver" />
        </>
      )}
      {result.nextFocus && (
        <>
          <SectionHeading label="Next Focus" />
          <p className="text-[13px] font-[400] text-[#F2D08C]">
            {result.nextFocus}
          </p>
        </>
      )}
    </section>
  );
}

function FullSynthesis({ result }: { result: SynthesisResponse["result"] }) {
  return (
    <section className="space-y-1 px-[28px] text-left">
      <div className="flex flex-col gap-[12px] mb-[30px] mt-[20px]">
        <p className="text-[#FFFFFF] text-[15px] font-[350]">All in all</p>
        <p className="text-[13px] font-[350] text-[#F2D08C] border-l border-[#F2D08C] pl-2">
          {result.identityLine}
        </p>
      </div>

      <div className="flex flex-col gap-[12px] mb-[20px]">
        <p className="text-[#FFFFFF] text-[15px] font-[350]">Sure Things</p>
        <p className="text-[13px] font-[350] text-[#FFFFFF]">
          {result.sureThings}
        </p>
      </div>

      <div className="mb-[40px]">
        {(result.dominantPatterns?.length ?? 0) > 0 && (
          <div className="flex flex-col gap-[8px]">
            {result.dominantPatterns!.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="border border-[#F2D08C] rounded-[5px] px-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[16px] font-[325] text-[#F2D08C] uppercase">
                    {item.pattern}
                  </p>
                </div>
                <div className="flex items-center flex-wrap">
                  <p className="text-[#FFFFFF] text-[11px] font-[350] mr-2">
                    Confirmed by
                  </p>
                  {item?.evidence?.map((ev, ei) => (
                    <span
                      key={ei}
                      className="text-[#D9D9D9] text-[11px] font-[300]"
                    >
                      {ev.source}
                      {ei < item.evidence.length - 1 ? " / " : " "}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BluePrint title="Your Core Identity" blueprint={result?.coreIdentity} />

      <Patterns patterns={result.hiddenPatterns} title="Hidden Patterns" />

      <Patterns patterns={result.emergingPatterns} title="Emerging Patterns" />

      <BluePrint
        title="Inner Conflict Map"
        blueprint={result?.innerConflictMap}
      />

      <Strength strengths={result?.coreStrengths} />

      <Challenge challenges={result?.coreChallenges} />

      <BluePrint
        title="Psychological Profile"
        blueprint={result?.psychologicalProfile}
      />

      <BluePrint
        title="Spiritual Blueprint"
        blueprint={result?.spiritualBlueprint}
      />

      <SpiritualInsight
        spiritualInsight={result.yourDirection}
        title="Your Direction"
      />

      <TryThis tryThis={result.tryThis} />

      <AvoidThis avoidThis={result.avoidThis} />

      <SpiritualInsight
        spiritualInsight={result?.finalInsight}
        title="Final Insight"
      />

      <BluePrint title="Right Now" blueprint={result?.currentEnergy} />
    </section>
  );
}

export function SynthesisPage({ isPremium: _isPremium }: SynthesisPageProps) {
  const [synthesis, setSynthesis] = useState<
    SynthesisResponse | null | undefined
  >(undefined);
  const [results, setResults] = useState<
    { test_id: number; test_title: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    apiGetSynthesis()
      .then((data) => {
        if (!cancelled) setSynthesis(data ?? null);
      })
      .catch((e) => {
        if (!cancelled) {
          setSynthesis(null);
          setError(e instanceof Error ? e.message : "Failed to load synthesis");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiListTestResults()
      .then((list) => {
        if (cancelled) return;
        const completed = list.filter((r) => r.status === "completed");
        const byId = new Map<number, { test_id: number; test_title: string }>();
        completed.forEach((r) => {
          if (!byId.has(r.test_id))
            byId.set(r.test_id, {
              test_id: r.test_id,
              test_title: r.test_title,
            });
        });
        setResults(Array.from(byId.values()));
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      });
    return () => {
      cancelled = true;
    };
  }, [synthesis?.completed_count]);

  const completedTests = useMemo(
    () =>
      results.map((r) => ({
        id: r.test_id,
        title: r.test_title,
        category: "",
        categoryId: "",
        icon: getTestUi(r.test_id).icon,
        locked: false,
        alreadyTaken: true,
        completed: true,
        questions: 0,
        auto_generated: false,
      })),
    [results],
  );

  const completedCount =
    synthesis?.completed_count ?? (results.length > 0 ? results.length : 0);
  const isFull = synthesis?.type === "full";
  const progress =
    TOTAL_TEST_COUNT > 0 ? Math.min(completedCount / TOTAL_TEST_COUNT, 1) : 0;
  const result = synthesis?.result ?? {};

  return (
    <div
      className="pb-16 space-y-4 text-white"
      style={{ fontFamily: "var(--font-gotham)" }}
    >
      <div className="mb-3 px-[28px] relative">
        <div className="h-[15px] rounded-full bg-transparent border border-[#F2D08C]/50 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${progress * 100}%`, backgroundColor: "#F2D08C" }}
          />
        </div>
        <p className="absolute right-10 top-1/2 -translate-y-1/2 text-white text-[10px] font-[400] z-10 pointer-events-none">
          {completedCount}/{TOTAL_TEST_COUNT}
        </p>
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-[21px] font-[300] text-[#FFFFFF]">
          {isFull ? "Your Full Synthesis" : "Your Synthesis"}
        </h1>
        {synthesis && completedTests.length > 0 && (
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-[9px] min-w-max snap-x snap-mandatory">
              {completedTests.map((test) => (
                <div key={test.id} className="flex-shrink-0 snap-start h-auto">
                  <TestCard
                    test={{
                      id: test.id,
                      title: test.title,
                      category: test.category,
                      locked: test.locked,
                      alreadyTaken: true,
                      questions: test.questions,
                      completed: true,
                      icon: test.icon,
                      autoGenerated: test.auto_generated,
                    }}
                    isSelected={false}
                    onSelect={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {synthesis === undefined && !error && (
        <div className="px-[28px] py-8 text-center text-[#F2D08C] font-[325]">
          Loading your synthesis…
        </div>
      )}

      {error && (
        <div className="px-[28px] py-4 text-center text-red-400 text-sm">
          {error}
        </div>
      )}

      {synthesis === null && !error && (
        <section className="space-y-4 px-[28px] text-left">
          <h2 className="font-[400] text-[15px] text-[#FFFFFF] pt-2">
            Unlock your synthesis
          </h2>
          <p className="text-[13px] font-[400] text-[#F2D08C]">
            Complete at least 3 onboarding tests to generate a preview
            synthesis. It will be stored and shown here when you return.
            Complete 6 tests and upgrade to premium to unlock your full
            portrait.
          </p>
          <p className="text-[13px] font-[300] text-[#9ca3af]">
            Go to Explore to take more tests.
          </p>
        </section>
      )}

      {synthesis &&
        result &&
        (isFull ? (
          <FullSynthesis result={result} />
        ) : (
          <PreviewSynthesis result={result} />
        ))}
    </div>
  );
}
