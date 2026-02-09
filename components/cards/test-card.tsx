"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TestCardProps {
  test: {
    id: number;
    title: string;
    category: string;
    locked: boolean;
    alreadyTaken: boolean;
    questions: number;
    completed?: boolean;
    icon: ReactNode;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function TestCard({ test, onSelect }: TestCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        `
        relative
        rounded-[10px]
        border
        transition-all
        duration-300
        flex
        flex-col
        items-center
        gap-2

        px-1.5
        py-3
        max-h-[120px]
        min-w-[100px]
        sm:min-w-[110px]
        max-w-[125px]

        min-h-[100px]
        sm:min-h-[110px]
        sm:px-3
        sm:py-3

        md:min-h-[120px]
        md:px-4
        `,
        !test.alreadyTaken
          ? "border-[#F2D08C66] cursor-not-allowed"
          : "border-[#F2D08C] cursor-pointer",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center max-w-[68px] h-[68px]",
          !test.alreadyTaken && "opacity-40",
        )}
      >
        {test.icon}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-gotham)",
          fontWeight: "300",
          lineHeight: "1.2",
        }}
        className="
          text-center
          text-white
          text-[11px]
          sm:text-[11px]
          md:text-[13px]
        "
      >
        {test.title}
      </h3>
    </button>
  );
}
