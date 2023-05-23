import React from "react";

export default function TableHeader({ columnNames }) {
  return (
    <div className={`grid grid-cols-5 gap-2  py-4 border-b border-gray-300	`}>
      {columnNames.map((col, index) => (
        <div
          key={index}
          className="whitespace-nowrap overflow-hidden overflow-ellipsis font-medium text-xs tablet:text-sm text-[#667085] "
        >
          {col.title}
        </div>
      ))}
    </div>
  );
}
