import React from "react";

interface AlignmentScoreCardProps {
  alignmentScore: number;
  alignmentState: string;
  imbalance?: number;
}

export function AlignmentScoreCard({
  alignmentScore,
  alignmentState,
  imbalance,
}: AlignmentScoreCardProps) {
  return (
    <div
      className="mb-8 p-4 rounded-2xl border flex items-center gap-4"
      style={{
        borderColor: "#F2D08C" + "44",
        background: "#F2D08C" + "11",
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
        style={{ background: "#F2D08C" + "22", color: "#F2D08C" }}
      >
        {alignmentScore}
      </div>
      <div>
        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">
          Alignment Score
        </p>
        <p
          className="font-[500] text-[15px]"
          style={{ color: "#F2D08C" }}
        >
          {alignmentState || "Unknown"}
        </p>
        {imbalance !== undefined && (
          <p className="text-white/40 text-[11px] mt-0.5">
            Imbalance gap: {imbalance} pts
          </p>
        )}
      </div>
    </div>
  );
}
