import { AtericksIconSVG } from "@/components/icons/astericks";
import React from "react";

interface IPersonalityTraitsProps {
  personality?: string[];
  design?: string[];
}

const LABELS = ["Mind", "Heart", "Body"];

function renderTraits(items?: string[]) {
  if (!items || items.length === 0) return null;

  return items.slice(0, 3).map((value, index) => (
    <div
      key={`${LABELS[index]}-${value}`}
      className="flex items-start text-left gap-1"
    >
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
        <span className="text-white">{LABELS[index]} - </span> {value}
      </p>
    </div>
  ));
}

export function PersonalityTraits({
  personality,
  design,
}: IPersonalityTraitsProps) {
  return (
    <div className="mb-[40px] flex flex-col gap-[40px]">
      {personality && personality.length > 0 && (
        <div>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            Personality (conscious)
          </p>
          <div className="flex flex-col gap-[10px]">
            {renderTraits(personality)}
          </div>
        </div>
      )}

      {design && design.length > 0 && (
        <div>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            Design (unconscious)
          </p>
          <div className="flex flex-col gap-[10px]">{renderTraits(design)}</div>
        </div>
      )}
    </div>
  );
}
