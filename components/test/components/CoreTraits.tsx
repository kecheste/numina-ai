import React from "react";

interface ICoreTraitsProps {
  coreTraits: string[];
}

export function CoreTraits({ coreTraits }: ICoreTraitsProps) {
  return (
    <div>
      {coreTraits.length > 0 && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            Core Traits
          </p>
          <div className="flex flex-col gap-[10px] mb-[40px]">
            {coreTraits.map((s: string) => (
              <p
                style={{
                  lineHeight: "15px",
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-left text-[13px] border border-[#F2D08C] border-[#F2D08C] rounded-[5px] py-0.5 pl-[8px] text-[#F2D08C] font-[350]"
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
