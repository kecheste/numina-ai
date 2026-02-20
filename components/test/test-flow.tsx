"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { TestResults } from "./test-results";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "../navigation/app-drawer";
import { apiFetchTestQuestions, apiSubmitTest, type QuestionFromApi } from "@/lib/api-client";

const GOLD = "#F2D08C";

function mapApiQuestionToLocal(q: QuestionFromApi): {
  id: number;
  type: "text" | "date" | "time" | "single_choice" | "multiple_choice" | "slider";
  question: string;
  options: string[] | null;
  slider_min: number;
  slider_max: number;
  required: boolean;
} {
  return {
    id: q.id,
    type: q.answer_type as "text" | "date" | "time" | "single_choice" | "multiple_choice" | "slider",
    question: q.prompt,
    options: q.options ?? null,
    slider_min: q.slider_min,
    slider_max: q.slider_max,
    required: q.required,
  };
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
  const [questions, setQuestions] = useState<ReturnType<typeof mapApiQuestionToLocal>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiFetchTestQuestions(testId)
      .then((list) => {
        if (!cancelled) setQuestions(list.map(mapApiQuestionToLocal));
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load questions");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [testId]);

  const current = questions[step];
  const progressPct = questions.length ? ((step + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    if (!current || current.type !== "slider") return;
    if (answers[current.id] !== undefined) return;
    const mid = Math.round((current.slider_min + current.slider_max) / 2);
    setAnswers((a) => ({ ...a, [current.id]: mid }));
  }, [current, answers]);

  const isAnswered = useCallback(() => {
    if (!current) return false;
    const v = answers[current.id];
    if (current.type === "multiple_choice") return Array.isArray(v) && v.length > 0;
    return v !== undefined && v !== "" && v !== null;
  }, [current, answers]);

  const handleBack = () => onClose();

  const handleContinue = useCallback(() => {
    if (!current) return;
    if (step === questions.length - 1) {
      setSubmitting(true);
      setSubmitError(null);
      const payload = Object.fromEntries(
        Object.entries(answers).map(([k, v]) => [String(k), v])
      ) as Record<string, string | number | string[]>;
      apiSubmitTest({
        test_id: testId,
        test_title: testTitle,
        category,
        answers: payload,
      })
        .then(() => setShowResults(true))
        .catch((e) => setSubmitError(e instanceof Error ? e.message : "Submit failed"))
        .finally(() => setSubmitting(false));
    } else {
      setStep((s) => s + 1);
    }
  }, [current, step, questions.length, answers, testId, testTitle, category]);

  if (showResults) {
    return (
      <TestResults
        testTitle={testTitle}
        category={category}
        onClose={onClose}
        resultData={{
          personalityType: "Reflective Explorer",
          insights: ["Your responses have been saved. Insights are being generated."],
          recommendations: ["Check back soon for your full result."],
          score: 82,
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-[#F2D08C] font-[325]">Loading questions…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 gap-4">
        <p className="text-[#F2D08C] font-[325] text-center">{error}</p>
        <Button onClick={handleBack} className="bg-[#F2D08C] text-black">Go back</Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 gap-4">
        <p className="text-[#F2D08C] font-[325] text-center">This test has no questions yet.</p>
        <Button onClick={handleBack} className="bg-[#F2D08C] text-black">Go back</Button>
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
            <Icon icon="icons8:left-arrow" color="#D9D9D9" width={30} className="mt-1.5" />
          </button>
          <NuminaLogoIcon className="mb-2" />
          <AppDrawer isPremium={false} portalContainer={shellRef} onLogout={() => router.push("/welcome")} />
        </div>

        <div className="flex flex-col px-[32px] flex-1 w-full">
          <p className="mt-16 text-center text-white text-[21px] font-[300]" style={{ lineHeight: "33px" }}>
            {testTitle}
          </p>

          <div className="my-[27px] relative w-full">
            <div className="h-[17px] w-full rounded-full border border-[#F2D08C] overflow-hidden">
              <div className="h-full" style={{ width: `${progressPct}%`, backgroundColor: GOLD }} />
            </div>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
              {step + 1}/{questions.length}
            </span>
          </div>

          <h2 className="text-center text-[21px] mb-6 text-[#F2D08C] font-[400]" style={{ lineHeight: "33px" }}>
            {current.question}
          </h2>

          <div className="flex-1 w-full space-y-4">
            {current.type === "text" && (
              <input
                type="text"
                className="w-full h-12 rounded-xl bg-[#FFFFFF1C] border border-white/50 outline-none text-white px-4"
                value={(answers[current.id] as string) ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
                placeholder="Type your answer…"
              />
            )}

            {current.type === "date" && (
              <input
                type="date"
                className="w-full h-12 rounded-xl bg-[#FFFFFF1C] border border-white/50 outline-none text-white px-4"
                value={(answers[current.id] as string) ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
              />
            )}

            {current.type === "time" && (
              <input
                type="time"
                className="w-full h-12 rounded-xl bg-[#FFFFFF1C] border border-white/50 outline-none text-white px-4"
                value={(answers[current.id] as string) ?? ""}
                onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
              />
            )}

            {current.type === "single_choice" && current.options && (
              <div className="space-y-4">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers((a) => ({ ...a, [current.id]: opt }))}
                    className={`w-full min-h-[56px] rounded-xl border text-left px-4 py-3 transition ${
                      answers[current.id] === opt ? "bg-[#F2D08C] text-black border-[#F2D08C]" : "border-[#5A4A2A] text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {current.type === "multiple_choice" && current.options && (
              <div className="space-y-3">
                {current.options.map((opt) => {
                  const selected = (answers[current.id] as string[] | undefined) ?? [];
                  const checked = selected.includes(opt);
                  return (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 w-full min-h-[56px] rounded-xl border px-4 py-3 cursor-pointer transition ${
                        checked ? "border-[#F2D08C] bg-[#F2D08C]/10" : "border-[#5A4A2A]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const next = checked ? selected.filter((x) => x !== opt) : [...selected, opt];
                          setAnswers((a) => ({ ...a, [current.id]: next }));
                        }}
                        className="rounded border-[#F2D08C] text-[#F2D08C]"
                      />
                      <span className="text-white">{opt}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {current.type === "slider" && (
              <div className="px-2">
                <input
                  type="range"
                  min={current.slider_min}
                  max={current.slider_max}
                  value={(answers[current.id] as number) ?? Math.round((current.slider_min + current.slider_max) / 2)}
                  onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: Number(e.target.value) }))}
                  className="w-full custom-range"
                />
                <p className="text-[#F2D08C] text-sm mt-2">
                  {(answers[current.id] as number) ?? Math.round((current.slider_min + current.slider_max) / 2)}
                </p>
              </div>
            )}
          </div>
        </div>

        {submitError && <p className="text-red-400 text-sm px-6">{submitError}</p>}

        <div className="px-[32px] w-full mt-auto pt-8 mb-8">
          <Button
            className="w-full text-[16px] rounded-[10px] bg-[#F2D08C] h-[67px] text-black"
            style={{ backgroundColor: GOLD, color: "black", fontFamily: "var(--font-arp80)", fontWeight: "400", lineHeight: "33px" }}
            disabled={!isAnswered() || submitting}
            onClick={handleContinue}
          >
            {submitting ? "Submitting…" : step === questions.length - 1 ? "Submit" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
