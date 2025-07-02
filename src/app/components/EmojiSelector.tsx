"use client";
import React from "react";

const EMOJI_COMBOS = [
  { animal: "🐒", fruit: "🍌" },
  { animal: "🐰", fruit: "🥕" },
  { animal: "🦊", fruit: "🍇" },
  { animal: "🐼", fruit: "🎋" },
  { animal: "🐸", fruit: "🍉" },
  { animal: "🐧", fruit: "🐟" },
  { animal: "🦁", fruit: "🍖" },
  { animal: "🐮", fruit: "🌽" },
];

export type EmojiCombo = typeof EMOJI_COMBOS[number];

interface EmojiSelectorProps {
  label: string;
  selected: EmojiCombo;
  onSelect: (combo: EmojiCombo) => void;
  disabledCombos?: EmojiCombo[];
}

export default function EmojiSelector({ label, selected, onSelect, disabledCombos = [] }: EmojiSelectorProps) {
  return (
    <div className="mb-4">
      <div className="font-semibold mb-2 text-lg text-center">{label}</div>
      <div className="flex flex-wrap justify-center gap-3">
        {EMOJI_COMBOS.map((combo) => {
          const isSelected = selected.animal === combo.animal && selected.fruit === combo.fruit;
          const isDisabled = disabledCombos.some(
            (c) => c.animal === combo.animal && c.fruit === combo.fruit
          );
          return (
            <button
              key={combo.animal + combo.fruit}
              className={`text-3xl md:text-4xl p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center min-w-[64px] min-h-[64px] shadow-sm
                ${isSelected ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : "border-gray-300 bg-white dark:bg-gray-800"}
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"}
              `}
              onClick={() => !isDisabled && onSelect(combo)}
              disabled={isDisabled}
              aria-label={`Select ${combo.animal}${combo.fruit}`}
            >
              <span>{combo.animal}</span>
              <span>{combo.fruit}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 text-center text-xl">
        <span className="mr-2">Selected:</span>
        <span className="text-2xl">{selected.animal}{selected.fruit}</span>
      </div>
    </div>
  );
} 