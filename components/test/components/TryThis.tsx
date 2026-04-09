import React from "react";
import { SparklingIcon } from "@/components/icons/sparkling";

interface ITryThisProps {
  tryThis: string[];
}

export function TryThis({ tryThis }: ITryThisProps) {
  return (
    <div>
      {tryThis.length > 0 && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px]"
          >
            Try This
          </p>
          <div className="flex flex-col gap-[10px] mb-[40px]">
            {tryThis.map((s: string) => (
              <p
                style={{
                  lineHeight: "19px",
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[13px] border-l border-[#D9D9D9] pl-[8px] text-[#D9D9D9] font-[350]"
              >
                {s}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
