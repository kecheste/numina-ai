import React from "react";
import { Button } from "../ui/button";

function AIFailed({
  onboardingNext,
  onClose,
}: {
  onboardingNext?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6 overflow-hidden">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-[#F2D08C]/10 blur-3xl opacity-70"></div>

      <div className="relative w-full max-w-[360px] rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#000000] border border-[#F2D08C40] shadow-[0_0_40px_rgba(242,208,140,0.2)] px-6 py-8 text-center backdrop-blur-md">
        <div className="flex justify-center mb-5">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full border border-[#F2D08C40]"></div>
            <div className="w-14 h-14 rounded-full border-2 border-transparent border-t-[#F2D08C] border-r-[#F2D08C]/70 animate-spin"></div>
            <div className="absolute w-2 h-2 bg-[#F2D08C] rounded-full shadow-[0_0_10px_#F2D08C]"></div>
          </div>
        </div>

        <h2
          className="text-[18px] font-[400] text-white mb-3"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "26px" }}
        >
          Result not ready
        </h2>

        <p
          className="text-[14px] font-[300] text-white/90 mb-2"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "22px" }}
        >
          We couldn’t generate your result right now. Your answers were saved.
        </p>

        <p
          className="text-[13px] font-[300] text-[#F2D08C] mb-6"
          style={{ fontFamily: "var(--font-gotham)", lineHeight: "20px" }}
        >
          Please try again later or contact support if it keeps happening.
        </p>

        <Button
          onClick={onboardingNext ?? onClose}
          className="w-full bg-[#F2D08C] text-black font-[400] rounded-[10px] h-12 transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,208,140,0.5)] hover:scale-[1.02]"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}

export default AIFailed;
