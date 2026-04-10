import React from "react";

interface IBluePrintProps {
  blueprint: string | null | undefined;
  title: string;
}

export function BluePrint({ blueprint, title }: IBluePrintProps) {
  return (
    <div>
      {blueprint && (
        <>
          <p
            style={{ lineHeight: "21px", fontFamily: "var(--font-gotham)" }}
            className="text-[15px] font-[350] text-[#FFFFFF] mb-[20px] text-left"
          >
            {title}
          </p>
          <div className="flex flex-col gap-[30px] mb-[40px] text-left">
            {blueprint.split("\n\n").map((para: string, i: number) => (
              <p
                key={i}
                style={{
                  lineHeight: "19px",
                  fontFamily: "var(--font-gotham)",
                }}
                className="text-[13px] border-l border-[#F2D08C] pl-[8px] text-[#FFFFFF] font-[350]"
              >
                {para}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
