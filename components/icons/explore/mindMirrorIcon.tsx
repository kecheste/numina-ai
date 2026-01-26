import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const MindMirrorIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2123_1313)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.5 2.43051C12.7587 2.43051 2.43051 12.7587 2.43051 25.5C2.43051 38.2413 12.7587 48.5695 25.5 48.5695C38.2413 48.5695 48.5695 38.2413 48.5695 25.5C48.5695 12.7587 38.2413 2.43051 25.5 2.43051ZM0 25.5C0 11.4182 11.4182 0 25.5 0C39.5818 0 51 11.4182 51 25.5C51 39.5818 39.5818 51 25.5 51C11.4182 51 0 39.5818 0 25.5Z"
          fill={color || "#F2D08C"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.21191 24.2877H25.4996V26.7123H1.21191V24.2877Z"
          fill={color || "#F2D08C"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64258 32.7857H25.4997V35.2162H3.64258V32.7857Z"
          fill={color || "#F2D08C"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64258 18.2143H25.4997V15.7838H3.64258V18.2143Z"
          fill={color || "#F2D08C"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.49805 9.71622H25.5V7.28571H8.49805V9.71622Z"
          fill={color || "#F2D08C"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2123_1313">
          <rect width="51" height="51" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
