import React from "react";
import { Icon } from "@iconify/react";

interface IInnerMotivationsProps {
  innerMotivations?: string[];
  title?: string;
}

export function InnerMotivations({
  innerMotivations,
  title = "Inner Motivations",
}: IInnerMotivationsProps) {
  return (
    <div className="mb-[40px]">
      {innerMotivations && innerMotivations.length > 0 && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#F2D08C] mb-[20px] text-left"
          >
            {title}
          </p>
          <div className="flex flex-col gap-[10px]">
            {innerMotivations.map((s: string) => (
              <div key={s} className="flex items-start text-left gap-2">
                <div>
                  <Icon icon={"mdi:star"} color="#F2D08C" />
                </div>
                <p
                  style={{
                    lineHeight: "15px",
                    fontFamily: "var(--font-gotham)",
                  }}
                  className="text-[13px] text-[#FFFFFF] font-[300]"
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
