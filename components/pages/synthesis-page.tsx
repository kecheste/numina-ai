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
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ProgressBar from "../custom/progress";
import { LockedIcon } from "../icons/locked";

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

function BlackSparkleIcon() {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4402 7.0601C11.6601 7.1501 10.9101 7.4201 10.2501 7.8401C9.1701 8.5201 8.3501 9.5401 7.9401 10.7401C7.6401 11.6001 7.5201 12.5101 7.5801 13.4301C7.4001 13.1901 7.2101 12.9601 7.0001 12.7401C6.2501 11.9701 5.3401 11.3901 4.3101 11.0301C3.1401 10.6101 1.88014 10.5501 0.670141 10.8401C1.27014 10.2301 1.7601 9.5101 2.1101 8.7201C2.4701 7.9101 2.6801 7.0401 2.7301 6.1601C2.7601 5.5101 2.6801 4.8701 2.4901 4.2501L2.4801 4.2301C2.3101 3.6501 2.0501 3.1001 1.7101 2.6001C2.2601 2.9201 2.8701 3.1401 3.5101 3.2501C4.6901 3.4501 5.9201 3.2701 6.9901 2.7201C7.7501 2.3401 8.3901 1.7901 8.8701 1.1101C9.2801 2.1201 9.9401 3.0101 10.8001 3.6901C11.5201 4.2601 12.4001 4.6001 13.0001 4.7501C12.7801 5.1401 12.6001 5.5601 12.4802 5.9901C12.3902 6.3401 12.3702 6.7001 12.4402 7.0601Z"
        fill="black"
      />
    </svg>
  );
}

function LockedSynthesis({
  completedCount,
  isPremium,
  onUnlock,
  onMaybeLater,
}: {
  completedCount: number;
  isPremium: boolean;
  onUnlock: () => void;
  onMaybeLater: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-8 text-center space-y-8">
      <h2
        className="text-[20px] font-[350] text-white mb-[40px]"
        style={{ fontFamily: "var(--font-gotham)" }}
      >
        Your Full Synthesis
      </h2>

      <div className="mb-4">
        <LockedIcon />
      </div>

      <div className="max-w-[300px] flex flex-col items-center gap-[23px]">
        {isPremium ? (
          <>
            <h2
              className="text-[16px] font-[325] text-[#F2D08C] uppercase mt-[35px]"
              style={{ fontFamily: "var(--font-gotham)" }}
            >
              Fill at least 12 tests to unlock full synthesis
            </h2>
          </>
        ) : (
          <>
            <h2
              className="text-[17px] font-[400] text-[#F2D08C] uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-gotham)" }}
            >
              YOUR SOUL PROFILE IS READY
            </h2>
          </>
        )}
      </div>

      <div className="pt-4 w-full">
        <ProgressBar
          value={completedCount}
          max={isPremium ? 24 : 16}
          type="text"
          text={`${completedCount}/${isPremium ? 24 : 16}`}
          textPosition="inside"
          fillColor="#282828"
        />
      </div>

      {!isPremium && (
        <div className="w-full max-w-[350px] flex flex-col gap-[9px] pt-4">
          <Button
            onClick={onUnlock}
            style={{
              fontFamily: "var(--font-arp80)",
              fontWeight: 400,
              lineHeight: "33px",
            }}
            className="
                w-full
                h-[67px]
                bg-[#F2D08C]
                text-black
                rounded-[10px]
                text-[16px]
                sm:text-[18px]
                cursor-pointer
                hover:bg-[#F2D08CC0]
                transition-colors
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
          >
            <span className="flex items-center gap-2">
              <BlackSparkleIcon /> Unlock for $9.99 / month
            </span>
          </Button>
          <Button
            onClick={onMaybeLater}
            style={{
              fontFamily: "var(--font-arp80)",
              lineHeight: "33px",
            }}
            className="
                w-full
                h-[67px]
                border
                border-[#F2D08C]
                cursor-pointer
                bg-transparent
                rounded-[10px]
                text-[#F2D08C]
                text-[16px]
                sm:text-[18px]
                hover:bg-[#F2D08C]/10
                transition-colors
                disabled:opacity-50
              "
          >
            Maybe later
          </Button>
        </div>
      )}
    </div>
  );
}

function InnerAlignmentSection({
  alignment,
}: {
  alignment?: NonNullable<SynthesisResponse["result"]["innerAlignment"]>;
}) {
  if (!alignment) return null;
  const metrics = [
    { label: "MIND", data: alignment.mind },
    { label: "HEART", data: alignment.heart },
    { label: "BODY", data: alignment.body },
    { label: "SOUL", data: alignment.soul },
    { label: "SPIRIT", data: alignment.spirit },
  ].filter((m) => m.data);

  if (metrics.length === 0) return null;

  return (
    <div className="my-[40px]">
      <h2 className="font-[350] text-[15px] text-[#FFFFFF]">
        Your Inner Alignment
      </h2>
      <div className="text-[13px] font-[350] text-[#D9D9D9] mb-[40px]">
        <p>
          A holistic snapshot of your energetic expression across five key areas
          of self:
        </p>
        <ul className="list-disc pl-[22px] space-y-1 my-2">
          {metrics.map((m) => (
            <li key={m.label} className="pl-1">
              <span className="capitalize text-white font-[400]">
                {m.label.toLowerCase()}
              </span>{" "}
              &ndash; {m.data.text}
            </li>
          ))}
        </ul>
        <p>
          These scores reflect how clearly each aspect is expressed in your
          current profile. Not a judgment &mdash; but a mirror for
          self-awareness and gentle rebalancing.
        </p>
      </div>

      <div className="space-y-[28px]">
        {metrics.map((m) => (
          <div key={m.label} className="relative">
            <div className="flex justify-between items-end mb-[6px]">
              <span className="text-[#D9D9D9] text-[13px] font-[325] uppercase">
                {m.label}
              </span>
              <span className="text-[#F2D08C] text-[13px] font-[325]">
                {m.data.percentage}%
              </span>
            </div>
            <div className="h-[3px] w-full bg-[#F2D08C2B] relative rounded-full">
              <div
                className="absolute left-0 top-0 h-full bg-[#F2D08C]"
                style={{ width: `${m.data.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
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
        <ul className="list-disc pl-5 text-[13px] font-[350] text-[#FFFFFF]">
          {Array.isArray(result.sureThings) ? (
            result.sureThings.map((s, i) => <li key={i}>{s}</li>)
          ) : (
            <li>{result.sureThings}</li>
          )}
        </ul>
      </div>

      <div className="mb-[40px] flex flex-col gap-[12px]">
        {(result.dominantPatterns?.length ?? 0) > 0 && (
          <div className="flex flex-col gap-[12px]">
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

      <InnerAlignmentSection alignment={result?.innerAlignment} />
    </section>
  );
}

export function SynthesisPage({ isPremium }: SynthesisPageProps) {
  const router = useRouter();
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
          if (!(e instanceof Error && e.message.includes("404"))) {
            setError(
              e instanceof Error ? e.message : "Failed to load synthesis",
            );
          }
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

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const completedCount =
    synthesis?.completed_count ?? (results.length > 0 ? results.length : 0);
  const showFull =
    isPremium && completedCount >= 12 && synthesis?.type === "full";
  const result = synthesis?.result ?? {};

  return (
    <div
      className="pb-16 space-y-[40px] text-white"
      style={{ fontFamily: "var(--font-gotham)" }}
    >
      {showFull && (
        <div className="px-[28px] pt-4">
          <ProgressBar
            value={completedCount}
            max={isPremium ? 24 : 16}
            type="text"
            text={`${completedCount}/${isPremium ? 24 : 16}`}
            textPosition="inside"
            fillColor="#282828"
          />
        </div>
      )}
      {showFull && (
        <div className="text-center">
          <h1 className="text-[21px] font-[400] text-[#FFFFFF]">
            Your Full synthesis
          </h1>

          {completedTests.length > 0 && (
            <div className="w-full overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-center gap-[9px] min-w-max snap-x snap-mandatory px-8">
                {completedTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex-shrink-0 snap-start h-auto"
                  >
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
      )}

      {synthesis === undefined && !error && (
        <div className="px-[28px] py-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 rounded-full border border-[#F2D08C]/40 flex items-center justify-center animate-spin mb-4">
            <div className="w-6 h-6 rounded-full bg-[#F2D08C] opacity-60" />
          </div>
          <p className="text-[#F2D08C] font-[325] text-sm tracking-widest uppercase">
            Synthesizing your soul data…
          </p>
        </div>
      )}

      {error && (
        <div className="px-[28px] py-8 text-center text-red-400 text-sm">
          {error}
        </div>
      )}

      {!showFull && synthesis !== undefined && !error && (
        <LockedSynthesis
          completedCount={completedCount}
          isPremium={isPremium}
          onUnlock={() => setShowSubscriptionModal(true)}
          onMaybeLater={() => router.push("/home/soul")}
        />
      )}

      {showFull && synthesis !== undefined && result && (
        <FullSynthesis result={result} />
      )}

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onUpgrade={() => {
            setShowSubscriptionModal(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
