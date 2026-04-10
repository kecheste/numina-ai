import React from "react";
import { DimensionConfig, DimensionEntry } from "./DimensionGrid";

interface AlignmentAnalysisProps {
  dims: DimensionEntry[];
  analysis: Record<string, string>;
  dimensionConfig: Record<string, DimensionConfig>;
  title?: string;
}

export function AlignmentAnalysis({
  dims,
  analysis,
  dimensionConfig,
  title = "Alignment Analysis",
}: AlignmentAnalysisProps) {
  if (Object.keys(analysis).length === 0) return null;

  return (
    <div className="mb-[40px] flex flex-col items-start">
      <p
        className="text-[#F2D08C] font-[300] text-[13px] mb-[10px] uppercase tracking-wider"
        style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
      >
        {title}
      </p>
      <div className="space-y-[16px] flex flex-col items-start">
        {dims.map(({ key }) => {
          const text = analysis[key];
          if (!text) return null;
          const cfg = dimensionConfig[key];
          if (!cfg) return null;
          return (
            <div
              key={key}
              className="text-left"
            >
              <span
                className="text-[13px] font-[500] uppercase tracking-wider"
                style={{ color: "#F2D08C", fontFamily: "var(--font-gotham)" }}
              >
                {cfg.label}
              </span>
              <p
                className="text-[#D9D9D9] text-[13px] font-[350] border-l border-[#F2D08C] pl-[8px]"
                style={{ fontFamily: "var(--font-gotham)" }}
              >
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
