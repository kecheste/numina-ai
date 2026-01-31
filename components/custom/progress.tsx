import React from "react";

const ProgressBar = ({
  value = 0, // number from 0–100
  max = 100,
  type = "percent", // "percent" | "text"
  text,
  textPosition = "inside", // "inside" | "outside"
  borderColor = "#F2D08C80",
  fillColor = "#F2D08C",
  trackColor = "transparent",
  precedingText,
  className = "",
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const displayText = type === "percent" ? `${Math.round(percentage)}%` : text;

  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      {precedingText && (
        <p
          style={{
            lineHeight: "30px",
          }}
          className="text-[13px] font-[400] text-white"
        >
          {precedingText}
        </p>
      )}

      <div className="relative w-full">
        <div
          className="h-[15px] rounded-full overflow-hidden border"
          style={{
            borderColor,
            backgroundColor: trackColor,
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: fillColor,
            }}
          />
        </div>

        {displayText && textPosition === "inside" && (
          <p className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[10px] font-normal pointer-events-none">
            {displayText}
          </p>
        )}
      </div>

      {displayText && textPosition === "outside" && (
        <p className="text-right text-white text-[13px] font-[300]">
          {displayText}
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
