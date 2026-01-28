import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const LifePathIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.5834 49L40.1714 21.996H23.6164V18.9H44.0414V21.437L30.3674 49H26.5834Z"
        fill="#F2D08C"
      />
      <circle cx="32.5" cy="32.5" r="31.5" stroke="#F2D08C" stroke-width="2" />
    </svg>
  );
};
