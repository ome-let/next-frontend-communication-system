import React from "react";

export default function NoImageSvg({ className, onClick }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="83"
      height="83"
      viewBox="0 0 83 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="82"
        height="82"
        rx="10.5"
        fill="white"
        stroke="#9D9D9D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 5"
      />
    </svg>
  );
}
