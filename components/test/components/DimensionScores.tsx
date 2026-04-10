import React from "react";

export interface Dimension {
  key: string;
  label: string;
  color?: string;
}

interface IDimensionScoresProps {
  title: string;
  dimensions: Dimension[];
  scores: Record<string, number>;
}

export function DimensionScores({
  title,
  dimensions,
  scores,
}: IDimensionScoresProps) {
  return (
    <div className="mb-[60px]">
      <h3
        className="text-[15px] font-[350] text-[#FFFFFF] text-left mb-[20px]"
        style={{ fontFamily: "var(--font-gotham)" }}
      >
        {title}
      </h3>
      <div className="space-y-6">
        {dimensions.map((dim) => {
          const val = scores[dim.key] ?? 0;
          const color = dim.color || "#F2D08C";
          return (
            <div key={dim.key} className="space-y-1">
              <div className="flex justify-between items-end text-[11px] font-[400] text-white/50 uppercase tracking-wider">
                <span
                  className="uppercase text-[13px] text-[#D9D9D9] font-[325]"
                  style={{ fontFamily: "var(--font-gotham)" }}
                >
                  {dim.label}
                </span>
                {/* <span style={{ color }} className="font-[500] text-[12px]">
                  {val}%
                </span> */}
              </div>
              <div className="relative h-[4px] w-full bg-[#F2D08C2B] rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.min(val, 100)}%`,
                    backgroundColor: color,
                    boxShadow: val > 0 ? `0 0 8px ${color}40` : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
