import React from "react";

function AIPreparing() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#0a0a0a] to-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(242,208,140,0.08),transparent)]" />
      <div className="relative w-full max-w-[380px] px-8 py-10 text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-14 w-14 rounded-full border-2 border-[#F2D08C30] border-t-[#F2D08C] animate-spin" />
        </div>
        <h2
          className="text-[20px] font-[400] text-white mb-3"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "28px" }}
        >
          Preparing your results…
        </h2>
        <p
          className="text-[14px] font-[300] text-[#F2D08C] mb-2"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "22px" }}
        >
          Our AI is weaving your insights into a clear, soulful reflection.
        </p>
        <p
          className="text-[12px] font-[300] text-white/50"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "18px" }}
        >
          This usually takes just a moment. Your result will appear here
          automatically.
        </p>
        <div className="mt-6 flex justify-center gap-1">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#F2D08C60] animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#F2D08C60] animate-pulse"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#F2D08C60] animate-pulse"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AIPreparing;
