import React from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const MindMirrorIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      width="71"
      height="62"
      viewBox="0 0 348 348"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M347.234 173.812C347.234 77.9825 269.339 0 173.617 0C77.895 0 0 77.9825 0 173.812C0 269.641 77.895 347.624 173.617 347.624C269.339 347.624 347.234 269.641 347.234 173.812ZM173.617 339.011C82.623 339.011 8.60322 264.908 8.60322 173.812C8.60322 82.7158 82.623 8.613 173.617 8.613C264.611 8.613 338.63 82.7158 338.63 173.812C338.63 264.908 264.611 339.011 173.617 339.011Z"
        fill="#F2D08C"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.3252 171.794H166.641V182.27H2.3252V171.794Z"
        fill="#F2D08C"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.2617 224.714H166.642V234.724H14.2617V224.714Z"
        fill="#F2D08C"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.2617 122.987H166.642V113.288H14.2617V122.987Z"
        fill="#F2D08C"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.1318 63.7051H166.641V55.7129H48.1318V63.7051Z"
        fill="#F2D08C"
      />
    </svg>
  );
};
