import { QuestionFromApi } from "@/lib/api-client";

export type FlowState =
  | "loading"
  | "questioning"
  | "submitting"
  | "processing"
  | "completed"
  | "failed";

export type MappedQuestion = ReturnType<typeof mapApiQuestionToLocal>;

export function mapApiQuestionToLocal(q: QuestionFromApi): {
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
