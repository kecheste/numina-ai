import { apiSubmitTest } from "@/lib/api-client";
import { MappedQuestion } from "@/components/test/types";

export interface SubmitTestParams {
  testId: number;
  testTitle: string;
  category: string;
  questions: MappedQuestion[];
  answers: Record<number, string | number | string[]>;
}

export async function submitTestFlow({
  testId,
  testTitle,
  category,
  questions,
  answers,
}: SubmitTestParams): Promise<number> {
  const answersPayload = questions.map((q) => ({
    question_id: q.id,
    prompt: q.question,
    answer_type: q.type,
    answer: answers[q.id] ?? (q.type === "multiple_choice" ? [] : ""),
  }));

  const res = await apiSubmitTest({
    test_id: testId,
    test_title: testTitle,
    category,
    answers: answersPayload,
  });

  return res.result_id;
}
