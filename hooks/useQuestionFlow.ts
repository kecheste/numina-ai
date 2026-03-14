import { useState, useMemo, useEffect, useCallback } from "react";
import { MappedQuestion } from "@/components/test/types";

export function useQuestionFlow(questions: MappedQuestion[]) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number | string[]>>({});

  const activeQuestions = useMemo(
    () =>
      questions.filter(
        (q) =>
          !q.show_when ||
          answers[q.show_when.question_id] === q.show_when.value
      ),
    [questions, answers]
  );

  useEffect(() => {
    if (step >= activeQuestions.length && activeQuestions.length > 0) {
      setStep(activeQuestions.length - 1);
    }
  }, [activeQuestions.length, step]);

  const currentQuestion = activeQuestions[step];

  useEffect(() => {
    if (!currentQuestion || currentQuestion.type !== "slider") return;
    if (answers[currentQuestion.id] !== undefined) return;
    const mid = Math.round((currentQuestion.slider_min + currentQuestion.slider_max) / 2);
    setAnswers((a) => ({ ...a, [currentQuestion.id]: mid }));
  }, [currentQuestion, answers]);

  const isAnswered = useCallback(() => {
    if (!currentQuestion) return false;
    const v = answers[currentQuestion.id];
    if (currentQuestion.type === "multiple_choice") {
      if (!Array.isArray(v) || v.length === 0) return false;
      const max = currentQuestion.max_selections ?? undefined;
      if (max != null) return v.length === max;
      return true;
    }
    return v !== undefined && v !== "" && v !== null;
  }, [currentQuestion, answers]);

  const progressPercent = activeQuestions.length
    ? ((step + 1) / activeQuestions.length) * 100
    : 0;

  const goNext = () => setStep((s) => s + 1);

  const setAnswer = (questionId: number, value: string | number | string[]) => {
    setAnswers((a) => ({ ...a, [questionId]: value }));
  };

  return {
    step,
    currentQuestion,
    activeQuestions,
    progressPercent,
    isAnswered,
    answers,
    goNext,
    setAnswer,
  };
}
