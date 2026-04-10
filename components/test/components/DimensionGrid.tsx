import React from "react";

export interface DimensionConfig {
  label: string;
  sublabel: string;
}

export interface DimensionEntry {
  key: string;
  value: number;
}

interface DimensionGridProps {
  dims: DimensionEntry[];
  dimensionConfig: Record<string, DimensionConfig>;
}

export function DimensionGrid({ dims, dimensionConfig }: DimensionGridProps) {
  return (
    <div className="mb-[40px]">
      <div className="space-y-[20px]">
        {dims.map(({ key, value }) => {
          const cfg = dimensionConfig[key];
          if (!cfg) return null;
          return (
            <div key={key} className="space-y-[8px]">
              <div className="flex justify-between items-end">
                <div className="flex flex-col items-start translate-y-[2px]">
                   <span
                    className="uppercase text-[13px] text-[#D9D9D9] font-[325]"
                    style={{ fontFamily: "var(--font-gotham)" }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <span
                  className="text-[17px] font-[500] text-[#F2D08C]"
                  style={{ fontFamily: "var(--font-gotham)" }}
                >
                  {value}
                </span>
              </div>
              <div className="relative h-[4px] w-full bg-[#F2D08C2B] rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.min(value, 100)}%`,
                    backgroundColor: "#F2D08C",
                    boxShadow: value > 0 ? `0 0 8px #F2D08C40` : "none",
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
