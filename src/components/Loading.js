import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-[50] bg-white">
      <img
        src="/loading.gif"
        className="w-[50px] h-[50px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"
      />
    </div>
  );
}
