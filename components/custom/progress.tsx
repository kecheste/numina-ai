import React from "react";

interface ProgressBarProps {
  value?: number;
  max?: number;
  type?: "percent" | "text";
  text?: string;
  textPosition?: "inside" | "outside";
  borderColor?: string;
  fillColor?: string;
  trackColor?: string;
  precedingText?: string;
  className?: string;
}

const ProgressBar = ({
  value = 0,
  max = 100,
  type = "percent",
  text,
  textPosition = "inside",
  borderColor = "#F2D08C80",
  fillColor = "#F2D08C",
  trackColor = "transparent",
  precedingText,
  className = "",
}: ProgressBarProps) => {
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
