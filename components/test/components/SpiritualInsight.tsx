import React from "react";

interface ISpiritualInsightProps {
  spiritualInsight: string | null;
}

export function SpiritualInsight({ spiritualInsight }: ISpiritualInsightProps) {
  return (
    <div>
      {spiritualInsight && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px]"
          >
            Spiritual Insight
          </p>
          <div className="flex flex-col gap-[10px] mb-[40px]">
            <p
              style={{
                lineHeight: "19px",
                fontFamily: "var(--font-gotham)",
              }}
              className="text-[13px] border-l border-[#F2D08C] pl-[8px] text-[#F2D08C] font-[350]"
            >
              {spiritualInsight}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
