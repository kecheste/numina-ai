import React from "react";

function QuestionsLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#F2D08C]/10 blur-3xl animate-pulse"></div>

      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-20 h-20 rounded-full border border-[#F2D08C]/20"></div>

        <div className="w-20 h-20 rounded-full border-2 border-transparent border-t-[#F2D08C] border-r-[#F2D08C]/60 animate-spin"></div>

        <div className="absolute w-5 h-5 rounded-full bg-[#F2D08C] shadow-[0_0_20px_#F2D08C] animate-pulse"></div>
      </div>

      <div className="text-[#F2D08C] text-[12px] tracking-[0.25em] font-[350] animate-pulse">
        LOADING QUESTIONS
      </div>

      <div className="flex gap-2 mt-3">
        <div className="w-1 h-1 rounded-full bg-[#F2D08C] animate-bounce"></div>
        <div className="w-1 h-1 rounded-full bg-[#F2D08C] animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-1 h-1 rounded-full bg-[#F2D08C] animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}

export default QuestionsLoading;
