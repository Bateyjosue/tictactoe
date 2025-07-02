"use client";
import React from "react";

interface GridSizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
  min?: number;
  max?: number;
}

export default function GridSizeSelector({ value, onChange, min = 3, max = 6 }: GridSizeSelectorProps) {
  return (
    <div className="mb-4 text-center">
      <div className="font-semibold mb-2 text-lg">Choose Grid Size</div>
      <div className="flex justify-center gap-3">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((size) => (
          <button
            key={size}
            className={`px-4 py-2 rounded-lg border-2 text-lg font-bold transition-all duration-150
              ${value === size ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : "border-gray-300 bg-white dark:bg-gray-800"}
              hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950
            `}
            onClick={() => onChange(size)}
            aria-label={`Select ${size} by ${size}`}
          >
            {size} x {size}
          </button>
        ))}
      </div>
    </div>
  );
} 