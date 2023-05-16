import React from "react";

export default function TableHeader({ columnNames }) {
  return (
    <div
      className={`grid grid-cols-5 py-4 font-medium text-sm text-[#667085] border-b border-gray-300	`}
    >
      {columnNames.map((col, index) => (
        <div key={index}>{col.title}</div>
      ))}
    </div>
  );
}
