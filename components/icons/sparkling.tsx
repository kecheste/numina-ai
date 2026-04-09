import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const SparklingIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#D9D9D999",
  className = "",
}) => {
  return (
    <svg
      width="10"
      height="13"
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.726073 0C5.89816 6.3048 4.16313 5.74362 10 2.98161C5.37011 7.57845 5.50212 5.70946 9.2645 13C4.10184 6.69519 5.83215 7.24662 0 10.0135C4.62518 5.41179 4.49788 7.3003 0.726073 0Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};
