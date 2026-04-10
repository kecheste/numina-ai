import React from "react";
import { SparklingIcon } from "@/components/icons/sparkling";

interface IPersonalityProps {
  extracted: {
    type?: string;
    strategy?: string;
    authority?: string;
    profile?: string;
  };
}

export function Personality({ extracted }: IPersonalityProps) {
  return (
    <div className="mb-[40px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-[#D9D9D9] pb-1">
        <span className="text-[13px] text-[#D9D9D9] font-[325] uppercase mb-1">
          Type
        </span>
        <span className="text-[13px] text-[#F2D08C] font-[325]">
          {extracted.type}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4 border-b border-[#D9D9D9] pb-1">
        <span className="text-[13px] text-[#D9D9D9] font-[325] uppercase mb-1">
          Strategy
        </span>
        <span className="text-[13px] text-[#F2D08C] font-[325]">
          {extracted.strategy}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4 border-b border-[#D9D9D9] pb-1">
        <span className="text-[13px] text-[#D9D9D9] font-[325] uppercase mb-1">
          Authority
        </span>
        <span className="text-[13px] text-[#F2D08C] font-[325]">
          {extracted.authority}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4 border-b border-[#D9D9D9] pb-1">
        <span className="text-[13px] text-[#D9D9D9] font-[325] uppercase mb-1">
          Profile
        </span>
        <span className="text-[13px] text-[#F2D08C] font-[325]">
          {extracted.profile}
        </span>
      </div>
    </div>
  );
}
