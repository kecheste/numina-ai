import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const SoulUrgeIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      width="49"
      height="42"
      viewBox="0 0 49 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2123_1375)">
        <path
          d="M44.9264 21.1823C49.6139 16.4542 49.5666 8.83277 44.8083 4.16349C40.0618 -0.505792 32.4107 -0.458746 27.7232 4.2811C26.2119 5.81009 25.1375 7.70367 24.6061 9.78544C22.9767 3.26962 16.3529 -0.682213 9.82349 0.952623C3.28228 2.58746 -0.684947 9.18561 0.956257 15.7014C1.47578 17.7597 2.52662 19.6533 4.01433 21.1823L24.3228 41.4119L44.8673 21.2646H44.9264V21.1823Z"
          stroke="#F2D08C"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2123_1375">
          <rect width="49" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
