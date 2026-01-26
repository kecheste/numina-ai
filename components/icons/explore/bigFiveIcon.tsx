import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const BigFiveIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      width="72"
      height="42"
      viewBox="0 0 72 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="41"
        rx="2.5"
        stroke={color || "#F2D08C"}
      />
      <rect
        x="30.5"
        y="0.5"
        width="11"
        height="41"
        rx="2.5"
        stroke={color || "#F2D08C"}
      />
      <rect
        x="15.5"
        y="0.5"
        width="11"
        height="41"
        rx="2.5"
        stroke={color || "#F2D08C"}
      />
      <rect
        x="45.5"
        y="0.5"
        width="11"
        height="41"
        rx="2.5"
        stroke={color || "#F2D08C"}
      />
      <rect
        x="60.5"
        y="0.5"
        width="11"
        height="41"
        rx="2.5"
        stroke={color || "#F2D08C"}
      />
    </svg>
  );
};
