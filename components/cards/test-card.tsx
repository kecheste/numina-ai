"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TestCardProps {
  test: {
    id: number;
    title: string;
    category: string;
    locked: boolean;
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
        "relative rounded-[10px] min-h-[115px] p-1 text-left transition-all duration-300 border",
        test.locked
          ? "border-[#F2D08C66] cursor-not-allowed"
          : "border-[#F2D08C] cursor-pointer",
      )}
    >
      <div className="space-y-2">
        <div className="flex flex-col items-center gap-1">
          <div className={`mb-1 ${test.locked ? "opacity-40" : ""}`}>
            {test.icon}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-gotham)",
              lineHeight: "17px",
            }}
            className="text-[10px] text-center font-[100] text-[#ffffff]"
          >
            {test.title}
          </h3>
        </div>
      </div>
    </button>
  );
}
