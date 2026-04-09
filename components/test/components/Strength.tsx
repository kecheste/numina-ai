import React from "react";
import { SparklingIcon } from "@/components/icons/sparkling";

interface IStrengthProps {
  strengths: string[];
}

export function Strength({ strengths }: IStrengthProps) {
  return (
    <div>
      {strengths.length > 0 && (
        <>
          <p
            style={{ fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            Core Strengths
          </p>
          <div className="flex flex-wrap gap-1 mb-[40px]">
            {strengths.map((s: string) => (
              <div key={s} className="flex items-center gap-2">
                <div>
                  <SparklingIcon />
                </div>
                <p
                  style={{
                    lineHeight: "15px",
                    fontFamily: "var(--font-gotham)",
                  }}
                  className="text-[13px] text-[#F2D08C] font-[350]"
                >
                  {s}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
