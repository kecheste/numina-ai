"use client";

import { useEffect, useMemo, useState } from "react";
import {
  apiGetSynthesis,
  apiListTestResults,
  type SynthesisResponse,
} from "@/lib/api-client";
import { getTestUi } from "@/lib/constants/testUiMap";
import { TestCard } from "@/components/cards/test-card";

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

function BulletList({
  items,
  color = "gold",
}: {
  items: string[];
  color?: "gold" | "silver" | "muted" | "red";
}) {
  const cls = {
    gold: "text-[#F2D08C]",
    silver: "text-[#D9D9D9]",
    muted: "text-[#9ca3af]",
    red: "text-[#f87171]",
  }[color];
  return (
    <ul className="space-y-1 mt-1">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-2 text-[13px] font-[300] ${cls}`}>
          <span className="mt-[3px] shrink-0 w-1 h-1 rounded-full bg-current opacity-70" />
          {item}
        </li>
      ))}
    </ul>
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
          <p className="text-[13px] font-[400] text-[#F2D08C]">{result.youAre}</p>
        </>
      )}
      {(result.sureThings?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="Sure Things" />
          <p className="text-[12px] text-[#9ca3af] mb-1">Patterns that stand out across your tests</p>
          <PillList items={result.sureThings!} color="gold" />
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
          <p className="text-[13px] font-[400] text-[#F2D08C]">{result.nextFocus}</p>
        </>
      )}
    </section>
  );
}

function FullSynthesis({ result }: { result: SynthesisResponse["result"] }) {
  return (
    <section className="space-y-1 px-[28px] text-left">

      {(result.identityLine || (result.dominantPatterns?.length ?? 0) > 0) && (
        <div className="mb-6 mt-1 rounded-2xl border border-[#F2D08C]/25 bg-gradient-to-b from-[#F2D08C]/8 to-transparent px-4 py-4 space-y-3">
          {result.identityLine && (
            <p className="text-[16px] font-[400] text-[#F2D08C] leading-snug tracking-tight">
              {result.identityLine}
            </p>
          )}
          {(result.dominantPatterns?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {result.dominantPatterns!.slice(0, 5).map((item, i) => (
                <span
                  key={i}
                  className="text-[#E7E7E7] border border-[#E7E7E7]/30 rounded-[10px] px-2.5 py-0.5 text-[11px] font-[300]"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {result.coreIdentity && (
        <>
          <SectionHeading label="🧬 Your Core Identity" />
          <QuoteBlock text={result.coreIdentity} />
        </>
      )}

      {(result.hiddenPatterns?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="🫥 Hidden Patterns" />
          <p className="text-[11px] text-[#9ca3af] mb-1">Present but underused</p>
          <BulletList items={result.hiddenPatterns!} color="silver" />
        </>
      )}

      {(result.emergingPatterns?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="🌱 Emerging Patterns" />
          <PillList items={result.emergingPatterns!} color="silver" />
        </>
      )}

      {result.innerConflictMap && (
        <>
          <SectionHeading label="⚖️ Inner Conflict Map" />
          <div className="mt-1 rounded-xl border border-[#F2D08C]/20 bg-[#F2D08C]/5 p-3">
            <p className="text-[13px] font-[300] text-[#E7E7E7] leading-relaxed">
              {result.innerConflictMap}
            </p>
          </div>
        </>
      )}

      {(result.coreStrengths?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="💎 Core Strengths" />
          <p className="text-[11px] text-[#9ca3af] mb-1">Confirmed across multiple assessments</p>
          <BulletList items={result.coreStrengths!} color="gold" />
        </>
      )}

      {(result.coreChallenges?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="⚠️ Core Challenges" />
          <BulletList items={result.coreChallenges!} color="muted" />
        </>
      )}

      {result.psychologicalProfile && (
        <>
          <SectionHeading label="🧠 Psychological Profile" />
          <QuoteBlock text={result.psychologicalProfile} />
        </>
      )}

      {result.spiritualBlueprint && (
        <>
          <SectionHeading label="✨ Spiritual Blueprint" />
          <QuoteBlock text={result.spiritualBlueprint} />
        </>
      )}

      {result.yourDirection && (
        <>
          <SectionHeading label="🧭 Your Direction" />
          <p className="text-[13px] font-[400] text-[#F2D08C] leading-relaxed mt-1">
            {result.yourDirection}
          </p>
        </>
      )}

      {(result.tryThis?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="🛠 Try This" />
          <BulletList items={result.tryThis!} color="silver" />
        </>
      )}

      {(result.avoidThis?.length ?? 0) > 0 && (
        <>
          <SectionHeading label="🚫 Avoid This" />
          <BulletList items={result.avoidThis!} color="red" />
        </>
      )}

      {result.finalInsight && (
        <div className="mt-5 rounded-2xl border border-[#F2D08C]/30 bg-gradient-to-b from-[#F2D08C]/10 to-transparent p-4">
          <p className="text-[11px] font-[400] text-[#F2D08C]/70 uppercase tracking-widest mb-1.5">
            🔮 Final Insight
          </p>
          <p className="text-[13px] font-[400] text-white leading-relaxed">
            {result.finalInsight}
          </p>
        </div>
      )}

      {result.currentEnergy && (
        <div className="mt-3 rounded-2xl border border-[#a8b4c8]/25 bg-gradient-to-b from-[#6b82a8]/10 to-transparent p-4">
          <p className="text-[11px] font-[400] text-[#a8c4e0]/70 uppercase tracking-widest mb-1.5">
            ⚡ Right Now
          </p>
          <p className="text-[11px] text-[#9ca3af] mb-2">
            Based on your current-state assessments
          </p>
          <p className="text-[13px] font-[300] text-[#c9d8e8] italic leading-relaxed">
            {result.currentEnergy}
          </p>
        </div>
      )}
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
    return () => { cancelled = true; };
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
            byId.set(r.test_id, { test_id: r.test_id, test_title: r.test_title });
        });
        setResults(Array.from(byId.values()));
      })
      .catch(() => { if (!cancelled) setResults([]); });
    return () => { cancelled = true; };
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
        <h1 className="text-[21px] font-light text-white">
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
            Complete at least 3 onboarding tests to generate a preview synthesis.
            It will be stored and shown here when you return. Complete 6 tests
            and upgrade to premium to unlock your full portrait.
          </p>
          <p className="text-[13px] font-[300] text-[#9ca3af]">
            Go to Explore to take more tests.
          </p>
        </section>
      )}

      {synthesis && result && (
        isFull ? (
          <FullSynthesis result={result} />
        ) : (
          <PreviewSynthesis result={result} />
        )
      )}
    </div>
  );
}
