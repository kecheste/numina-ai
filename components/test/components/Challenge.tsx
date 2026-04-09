import React from "react";
import { SparklingIcon } from "@/components/icons/sparkling";

interface IChallengeProps {
  challenges: string[];
}

export function Challenge({ challenges }: IChallengeProps) {
  return (
    <div>
      {challenges.length > 0 && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px]"
          >
            Challenges
          </p>
          <div className="flex flex-wrap gap-1 mb-[40px]">
            {challenges.map((s: string) => (
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
