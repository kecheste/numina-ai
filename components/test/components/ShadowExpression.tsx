import React from "react";
import { Icon } from "@iconify/react";
import { AtericksIconSVG } from "@/components/icons/astericks";

interface IShadowExpressionProps {
  shadowExpression?: string[];
}

export function ShadowExpression({ shadowExpression }: IShadowExpressionProps) {
  return (
    <div className="mb-[40px]">
      {shadowExpression && shadowExpression.length > 0 && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#F2D08C] mb-[20px] text-left"
          >
            Shadow Expression
          </p>
          <div className="flex flex-col gap-[10px]">
            {shadowExpression.map((s: string) => (
              <div key={s} className="flex items-start text-left gap-2">
                <div>
                  <AtericksIconSVG />
                </div>
                <p
                  style={{
                    lineHeight: "15px",
                    fontFamily: "var(--font-gotham)",
                  }}
                  className="text-[13px] text-[#FFFFFF] font-[3050]"
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
