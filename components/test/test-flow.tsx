"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { TestResults } from "./test-results";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NuminaLogoIcon } from "../icons/logo/numina-normal";
import { AppDrawer } from "../navigation/app-drawer";

const GOLD = "#F2D08C";

type QuestionType =
  | "select"
  | "textarea"
  | "color"
  | "reorder"
  | "dropdown"
  | "progress";

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "color",
    question: "Which color feels most aligned with you right now?",
    options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "White"],
  },
  {
    id: 2,
    type: "select",
    question: "How do you usually approach deadlines?",
    options: [
      "I like clear structure and timelines",
      "I work best under gentle pressure",
      "I prefer complete flexibility",
    ],
  },
  {
    id: 3,
    type: "textarea",
    question: "Explain how much you recharge after a long day.",
  },
  {
    id: 4,
    type: "dropdown",
    question: "When solving problems, you mostly rely on:",
    options: ["Logic", "Intuition", "Experience", "Collaboration"],
  },
  {
    id: 5,
    type: "reorder",
    question: "Reorder what motivates you the most (top = strongest):",
    options: ["Growth", "Stability", "Recognition", "Freedom"],
  },
  {
    id: 6,
    type: "progress",
    question: "How mentally energized do you feel most mornings?",
  },
];

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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);

  const current = QUESTIONS[step];
  const progressPct = ((step + 1) / QUESTIONS.length) * 100;

  const reorderItems =
    (answers[current.id] as string[]) ?? current.options ?? [];

  useEffect(() => {
    if (current.type === "reorder" && !answers[current.id] && current.options) {
      const options = current.options;
      setAnswers((prev) => ({
        ...prev,
        [current.id]: [...options],
      }));
    }
  }, [current, answers]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const handleBack = () => {
    onClose();
  };

  if (showResults) {
    return (
      <TestResults
        testTitle={testTitle}
        category={category}
        onClose={onClose}
        resultData={{
          personalityType: "Reflective Explorer",
          insights: ["You balance intuition and logic well"],
          recommendations: ["Lean into reflective routines"],
          score: 82,
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-0 sm:px-4">
      <div
        ref={shellRef}
        style={{
          fontFamily: "var(--font-gotham)",
        }}
        className="
          relative
          w-full
          h-full
          sm:h-auto
          sm:min-h-0
          sm:max-w-[450px]
          sm:aspect-[9/20]
          bg-black
          overflow-y-auto
          sm:overflow-hidden
          flex
          flex-col
          items-center
          text-center
          pb-12
        "
      >
        {/* Top Bar */}
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

        {/* Subtitle */}
        <div className="flex flex-col px-[32px]">
          <p
            style={{
              lineHeight: "33px",
            }}
            className="mt-16 text-center text-white text-[21px] font-[300]"
          >
            Discover Your Cognitive Blueprint
          </p>

          {/* Progress */}
          <div className="my-[27px] relative w-full">
            <div className="h-[17px] w-full rounded-full border border-[#F2D08C] overflow-hidden">
              <div
                className="h-full"
                style={{ width: `${progressPct}%`, backgroundColor: GOLD }}
              />
            </div>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px]">
              {step + 1}/{QUESTIONS.length}
            </span>
          </div>

          {/* Question */}
          <h2
            style={{
              lineHeight: "33px",
            }}
            className="text-center text-[21px] mb-6 text-[#F2D08C] font-[400]"
          >
            {current.question}
          </h2>

          {/* Answers */}
          <div className="flex-1 w-full">
            {current.type === "select" && (
              <div className="space-y-4">
                {current.options!.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setAnswers({ ...answers, [current.id]: opt })
                    }
                    className={`w-full h-[70px] rounded-xl border text-left px-4 transition
                    ${
                      answers[current.id] === opt
                        ? "bg-[#F2D08C] text-black border-[#F2D08C]"
                        : "border-[#5A4A2A] text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {current.type === "textarea" && (
              <textarea
                className="w-full h-[160px] rounded-xl bg-[#FFFFFF1C] border border-[#FFFFFF]/50 outline-none text-white p-4"
                // placeholder="Write freely here…"
                value={answers[current.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [current.id]: e.target.value })
                }
              />
            )}

            {current.type === "dropdown" && (
              <div className="relative w-full">
                <select
                  className="
                  w-full
                  h-[70px]
                  rounded-xl
                  bg-black
                  border
                  border-[#5A4A2A]
                  text-white
                  px-4
                  pr-12
                  text-center
                  outline-none
                  appearance-none
                  focus:border-[#F2D08C]
                  "
                  value={answers[current.id] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [current.id]: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  {current.options!.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-black text-white"
                    >
                      {opt}
                    </option>
                  ))}
                </select>

                {/* Custom dropdown icon */}
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#F2D08C]">
                  <Icon icon={"teenyicons:down-outline"} />
                </span>
              </div>
            )}

            {current.type === "color" && (
              <div className="space-y-3">
                {current.options!.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setAnswers({ ...answers, [current.id]: color })
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

            {current.type === "reorder" && (
              <div className="p-3 border border-[#F2D08C80]/50 rounded-[10px]">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={({ active, over }) => {
                    if (!over || active.id === over.id) return;

                    const items = reorderItems;
                    const oldIndex = items.indexOf(active.id as string);
                    const newIndex = items.indexOf(over.id as string);

                    const updated = [...items];
                    const [moved] = updated.splice(oldIndex, 1);
                    updated.splice(newIndex, 0, moved);

                    setAnswers((prev) => ({
                      ...prev,
                      [current.id]: updated,
                    }));
                  }}
                >
                  <SortableContext
                    items={reorderItems}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className="space-y-3">
                      {reorderItems.map((opt, idx) => (
                        <SortableItem
                          key={opt}
                          id={opt}
                          index={idx}
                          label={opt}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              </div>
            )}

            {current.type === "progress" && (
              <input
                type="range"
                min={0}
                max={100}
                value={answers[current.id] || 50}
                onChange={(e) =>
                  setAnswers({ ...answers, [current.id]: e.target.value })
                }
                className="w-full custom-range"
                style={{
                  ["--value" as any]: answers[current.id] || 50,
                }}
              />
            )}
          </div>
        </div>
        {/* Continue */}
        <div className="px-[32px] w-full mt-auto mb-8">
          <Button
            className="w-full text-[16px] rounded-[10px] bg-[#F2D08C] h-[67px] text-black"
            style={{
              backgroundColor: GOLD,
              color: "black",
              fontFamily: "var(--font-arp80)",
              fontWeight: "400",
              lineHeight: "33px",
            }}
            disabled={answers[current.id] == null}
            onClick={() => {
              if (step === QUESTIONS.length - 1) {
                setShowResults(true);
              } else {
                setStep(step + 1);
              }
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

function SortableItem({
  id,
  index,
  label,
}: {
  id: string;
  index: number;
  label: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`
        w-full
        h-[50px]
        rounded-lg
        border
        px-4
        flex
        items-center
        justify-between
        text-white
        cursor-grab
        touch-none
        select-none
        ${
          isDragging
            ? "bg-[#1A1A1A] border-[#F2D08C]"
            : "bg-black border-[#5A4A2A]"
        }
        `}
      {...attributes}
      {...listeners}
    >
      <span className="text-sm">
        {index + 1}. {label}
      </span>

      <span className="text-[#F2D08C]/50 text-xl">
        <Icon icon={"lsicon:drag-outline"} fontSize={"32px"} />
      </span>
    </li>
  );
}
