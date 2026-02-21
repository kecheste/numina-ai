"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { TestResults } from "./test-results";
import { AstrologyChartResultView } from "./result-view";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "../navigation/app-drawer";
import {
  apiFetchAstrologyChart,
  apiFetchTestQuestions,
  apiSubmitTest,
  type AstrologyChartResponse,
  type QuestionFromApi,
} from "@/lib/api-client";

const GOLD = "#F2D08C";

type MappedQuestion = ReturnType<typeof mapApiQuestionToLocal>;

function mapApiQuestionToLocal(q: QuestionFromApi): {
  id: number;
  type:
    | "text"
    | "date"
    | "time"
    | "single_choice"
    | "multiple_choice"
    | "slider"
    | "color";
  question: string;
  options: string[] | null;
  slider_min: number;
  slider_max: number;
  required: boolean;
  options_from_question_id?: number | null;
  show_when?: { question_id: number; value: string } | null;
  max_selections?: number | null;
} {
  return {
    id: q.id,
    type: q.answer_type as
      | "text"
      | "date"
      | "time"
      | "single_choice"
      | "multiple_choice"
      | "slider"
      | "color",
    question: q.prompt,
    options: q.options ?? null,
    slider_min: q.slider_min,
    slider_max: q.slider_max,
    required: q.required,
    options_from_question_id: q.options_from_question_id ?? null,
    show_when: q.show_when ?? null,
    max_selections: q.max_selections ?? null,
  };
}

/** Options for current question: static or from a previous question's answer */
function getOptions(
  q: MappedQuestion,
  answers: Record<number, string | number | string[]>,
): string[] {
  if (q.options_from_question_id != null) {
    const src = answers[q.options_from_question_id];
    if (Array.isArray(src)) return src as string[];
    return [];
  }
  return q.options ?? [];
}

export function TestFlow({
  testId,
  testTitle,
  category,
  onClose,
}: {
  testId: number;
  testTitle: string;
  category: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const [questions, setQuestions] = useState<MappedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, string | number | string[]>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [astrologyChart, setAstrologyChart] =
    useState<AstrologyChartResponse | null>(null);

  const isAstrologyChartTest = testId === 1;

  /** Questions visible given current answers (filters by show_when) */
  const activeQuestions = useMemo(
    () =>
      questions.filter(
        (q) =>
          !q.show_when ||
          answers[q.show_when.question_id] === q.show_when.value,
      ),
    [questions, answers],
  );

  /** Clamp step when activeQuestions shrinks (e.g. user changed Q4 to No) */
  useEffect(() => {
    if (step >= activeQuestions.length && activeQuestions.length > 0) {
      setStep(activeQuestions.length - 1);
    }
  }, [activeQuestions.length, step]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setAstrologyChart(null);

    if (isAstrologyChartTest) {
      apiFetchAstrologyChart()
        .then((chart) => {
          if (!cancelled) setAstrologyChart(chart);
        })
        .catch((e) => {
          if (!cancelled)
            setError(
              e instanceof Error ? e.message : "Failed to load astrology chart",
            );
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      apiFetchTestQuestions(testId)
        .then((list) => {
          if (!cancelled) setQuestions(list.map(mapApiQuestionToLocal));
        })
        .catch((e) => {
          if (!cancelled)
            setError(
              e instanceof Error ? e.message : "Failed to load questions",
            );
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [testId, isAstrologyChartTest]);

  const current = activeQuestions[step];
  const progressPct = activeQuestions.length
    ? ((step + 1) / activeQuestions.length) * 100
    : 0;

  useEffect(() => {
    if (!current || current.type !== "slider") return;
    if (answers[current.id] !== undefined) return;
    const mid = Math.round((current.slider_min + current.slider_max) / 2);
    setAnswers((a) => ({ ...a, [current.id]: mid }));
  }, [current, answers]);

  const isAnswered = useCallback(() => {
    if (!current) return false;
    const v = answers[current.id];
    if (current.type === "multiple_choice") {
      if (!Array.isArray(v) || v.length === 0) return false;
      const max = current.max_selections ?? undefined;
      if (max != null) return v.length === max;
      return true;
    }
    return v !== undefined && v !== "" && v !== null;
  }, [current, answers]);

  const handleBack = () => onClose();

  const handleContinue = useCallback(() => {
    if (!current) return;
    if (step === activeQuestions.length - 1) {
      setSubmitting(true);
      setSubmitError(null);
      const answersPayload = questions.map((q) => ({
        question_id: q.id,
        prompt: q.question,
        answer_type: q.type,
        answer: answers[q.id] ?? (q.type === "multiple_choice" ? [] : ""),
      }));
      apiSubmitTest({
        test_id: testId,
        test_title: testTitle,
        category,
        answers: answersPayload,
      })
        .then(() => setShowResults(true))
        .catch((e) =>
          setSubmitError(e instanceof Error ? e.message : "Submit failed"),
        )
        .finally(() => setSubmitting(false));
    } else {
      setStep((s) => s + 1);
    }
  }, [
    current,
    step,
    activeQuestions.length,
    questions,
    answers,
    testId,
    testTitle,
    category,
  ]);

  if (isAstrologyChartTest && astrologyChart) {
    return (
      <AstrologyChartResultView
        chart={astrologyChart}
        onClose={onClose}
        shellRef={shellRef}
        onLogout={() => router.push("/welcome")}
      />
    );
  }

  if (showResults) {
    return (
      <TestResults
        testTitle={testTitle}
        category={category}
        onClose={onClose}
        resultData={{
          personalityType: "Reflective Explorer",
          insights: [
            "Your responses have been saved. Insights are being generated.",
          ],
          recommendations: ["Check back soon for your full result."],
          score: 82,
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-[#F2D08C] font-[325]">
          {isAstrologyChartTest ? "Loading your chart…" : "Loading questions…"}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 gap-4">
        <p className="text-[#F2D08C] font-[325] text-center">{error}</p>
        <Button onClick={handleBack} className="bg-[#F2D08C] text-black">
          Go back
        </Button>
      </div>
    );
  }

  if (questions.length === 0 || activeQuestions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 gap-4">
        <p className="text-[#F2D08C] font-[325] text-center">
          {isAstrologyChartTest
            ? "Could not load astrology chart."
            : "This test has no questions yet."}
        </p>
        <Button onClick={handleBack} className="bg-[#F2D08C] text-black">
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{ fontFamily: "var(--font-gotham)" }}
        className="relative w-full h-full sm:h-auto sm:min-h-0 sm:max-w-[450px] sm:aspect-[9/20] bg-black overflow-y-auto sm:overflow-hidden flex flex-col items-center text-center pb-12"
      >
        <div className="flex items-center border-b border-gray-500/30 justify-between w-full max-w-[450px] bg-black px-[28px] py-2">
          <button onClick={handleBack} className="cursor-pointer">
            <Icon
              icon="icons8:left-arrow"
              color="#D9D9D9"
              width={30}
              className="mt-1.5"
            />
          </button>
          <NuminaLogoIcon className="mb-2" />
          <AppDrawer
            isPremium={false}
            portalContainer={shellRef}
            onLogout={() => router.push("/welcome")}
          />
        </div>

        <div className="flex flex-col px-[32px] flex-1 w-full">
          <p
            className="mt-16 text-center text-white text-[21px] font-[300]"
            style={{ lineHeight: "33px" }}
          >
            {testTitle}
          </p>

          <div className="my-[27px] relative w-full">
            <div className="h-[17px] w-full rounded-full border border-[#F2D08C] overflow-hidden">
              <div
                className="h-full"
                style={{ width: `${progressPct}%`, backgroundColor: GOLD }}
              />
            </div>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
              {step + 1}/{activeQuestions.length}
            </span>
          </div>

          <h2
            className="text-center text-[21px] mb-6 text-[#F2D08C] font-[400]"
            style={{ lineHeight: "33px" }}
          >
            {current.question}
          </h2>

          <div className="flex-1 w-full space-y-4">
            {current.type === "text" && (
              <textarea
                className="w-full h-[160px] rounded-xl bg-[#FFFFFF1C] border border-[#FFFFFF]/50 outline-none text-white p-4"
                value={(answers[current.id] as string) ?? ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [current.id]: e.target.value }))
                }
                placeholder="Type your answer…"
              />
            )}

            {current.type === "date" && (
              <input
                type="date"
                className="w-full h-12 rounded-xl bg-[#FFFFFF1C] border border-white/50 outline-none text-white px-4"
                value={(answers[current.id] as string) ?? ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [current.id]: e.target.value }))
                }
              />
            )}

            {current.type === "time" && (
              <input
                type="time"
                className="w-full h-12 rounded-xl bg-[#FFFFFF1C] border border-white/50 outline-none text-white px-4"
                value={(answers[current.id] as string) ?? ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [current.id]: e.target.value }))
                }
              />
            )}

            {current.type === "color" && (
              <div className="space-y-3">
                {current.options!.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [current.id]: color }))
                    }
                    className="w-full h-[48px] rounded-lg text-left px-4 font-[300] text-[15px]"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      color:
                        color === "Yellow" || color === "White"
                          ? "black"
                          : "white",
                      opacity: answers[current.id] === color ? 1 : 0.6,
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}

            {current.type === "single_choice" &&
              (() => {
                const opts = getOptions(current, answers);
                return opts.length > 0 ? (
                  <div className="space-y-4">
                    {opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [current.id]: opt }))
                        }
                        className={`w-full min-h-[56px] rounded-xl border text-left px-4 py-3 transition ${
                          answers[current.id] === opt
                            ? "bg-[#F2D08C] text-black border-[#F2D08C]"
                            : "border-[#5A4A2A] text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70 text-sm">
                    Answer the previous question first.
                  </p>
                );
              })()}

            {current.type === "multiple_choice" &&
              (() => {
                const opts = getOptions(current, answers);
                const selected =
                  (answers[current.id] as string[] | undefined) ?? [];
                const maxSel = current.max_selections ?? undefined;
                return opts.length > 0 ? (
                  <div className="space-y-3">
                    {maxSel != null && (
                      <p className="text-[#F2D08C] text-sm">
                        Select exactly {maxSel} (selected: {selected.length})
                      </p>
                    )}
                    {opts.map((opt) => {
                      const checked = selected.includes(opt);
                      const atMax =
                        maxSel != null && selected.length >= maxSel && !checked;
                      return (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 w-full min-h-[56px] rounded-xl border px-4 py-3 cursor-pointer transition ${
                            checked
                              ? "bg-[#F2D08C] text-black border-[#F2D08C]"
                              : atMax
                                ? "border-[#5A4A2A] text-white opacity-60 cursor-not-allowed"
                                : "border-[#5A4A2A] text-white"
                          }`}
                          onClick={() => {
                            if (atMax) return;
                            const next = checked
                              ? selected.filter((x) => x !== opt)
                              : maxSel != null && selected.length >= maxSel
                                ? selected
                                : [...selected, opt];
                            setAnswers((a) => ({ ...a, [current.id]: next }));
                          }}
                        >
                          <span className="text-white">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-white/70 text-sm">
                    Answer the previous question first.
                  </p>
                );
              })()}

            {current.type === "slider" &&
              (() => {
                const value =
                  (answers[current.id] as number) ??
                  Math.round((current.slider_min + current.slider_max) / 2);
                const range = current.slider_max - current.slider_min || 1;
                const pct = ((value - current.slider_min) / range) * 100;
                return (
                  <div className="px-2">
                    <input
                      type="range"
                      min={current.slider_min}
                      max={current.slider_max}
                      value={value}
                      onChange={(e) =>
                        setAnswers((a) => ({
                          ...a,
                          [current.id]: Number(e.target.value),
                        }))
                      }
                      className="w-full custom-range"
                      style={{ ["--value" as string]: pct }}
                    />
                    <p className="text-[#F2D08C] text-sm mt-2">{value}</p>
                  </div>
                );
              })()}
          </div>
        </div>

        {submitError && (
          <p className="text-red-400 text-sm px-6">{submitError}</p>
        )}

        <div className="px-[32px] w-full mt-auto pt-8 mb-8">
          <Button
            className="w-full text-[16px] rounded-[10px] bg-[#F2D08C] h-[67px] text-black"
            style={{
              backgroundColor: GOLD,
              color: "black",
              fontFamily: "var(--font-arp80)",
              fontWeight: "400",
              lineHeight: "33px",
            }}
            disabled={!isAnswered() || submitting}
            onClick={handleContinue}
          >
            {submitting
              ? "Submitting…"
              : step === questions.length - 1
                ? "Submit"
                : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
