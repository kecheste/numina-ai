import React from "react";
import { AtericksIconSVG } from "@/components/icons/astericks";

interface IPatternsProps {
  patterns?: string[];
  title?: string;
}

function renderTraits(items?: string[]) {
  if (!items || items.length === 0) return null;

  return items.slice(0, 3).map((value, index) => (
    <div key={index} className="flex items-start text-left gap-1">
      <div>
        <AtericksIconSVG />
      </div>
      <p
        style={{
          lineHeight: "15px",
          fontFamily: "var(--font-gotham)",
        }}
        className="text-[13px] text-[#D9D9D9] font-[350]"
      >
        <span className="text-white">{value}</span>
      </p>
    </div>
  ));
}

export function Patterns({ patterns, title }: IPatternsProps) {
  return (
    <div className="mb-[40px] flex flex-col gap-[40px]">
      {patterns && patterns.length > 0 && (
        <div>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            {title}
          </p>
          <div className="flex flex-col gap-[10px]">
            {renderTraits(patterns)}
          </div>
        </div>
      )}
    </div>
  );
}
