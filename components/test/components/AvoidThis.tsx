import React from "react";

interface IAvoidThisProps {
  avoidThis: string[];
}

export function AvoidThis({ avoidThis }: IAvoidThisProps) {
  return (
    <div>
      {avoidThis.length > 0 && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            Avoid This
          </p>
          <div className="flex flex-col gap-[10px] mb-[40px]">
            {avoidThis.map((s: string) => (
              <p
                style={{
                  lineHeight: "19px",
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[13px] text-left border-l border-[#D9D9D9] pl-[8px] text-[#D9D9D9] font-[350]"
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
