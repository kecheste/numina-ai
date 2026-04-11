import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const AtericksIconSVG: React.FC<IconProps> = ({
  size = 24,
  color = "#D9D9D999",
  className = "",
}) => {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2604_824)">
        <path
          d="M9 3.09375C7.84404 3.76393 6.81193 4.23161 5.90367 4.5C6.81193 4.76839 7.84404 5.23607 9 5.90625L8.00917 7.59375C6.74257 6.84321 5.80789 6.21482 5.20184 5.70536C5.39505 6.53625 5.49083 7.63393 5.49083 9H3.50917C3.50917 7.63393 3.60495 6.53625 3.79817 5.70536C3.19211 6.21482 2.25743 6.84321 0.990826 7.59375L0 5.90625C1.15596 5.23607 2.18807 4.76839 3.09633 4.5C2.18807 4.23161 1.15596 3.76393 0 3.09375L0.990826 1.40625C2.25743 2.15679 3.19211 2.78518 3.79817 3.29464C3.60495 2.46375 3.50917 1.36607 3.50917 0H5.49083C5.49083 1.36607 5.39505 2.46375 5.20184 3.29464C5.80789 2.78518 6.74257 2.15679 8.00917 1.40625L9 3.09375Z"
          fill="#D9D9D9"
        />
      </g>
      <defs>
        <clipPath id="clip0_2604_824">
          <rect width="9" height="9" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
