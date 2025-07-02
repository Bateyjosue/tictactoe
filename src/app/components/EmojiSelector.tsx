"use client";
import React from "react";

const ANIMALS = [
  { emoji: "🐒", name: "Monkey" },
  { emoji: "🐰", name: "Rabbit" },
  { emoji: "🦊", name: "Fox" },
  { emoji: "🐼", name: "Panda" },
  { emoji: "🐸", name: "Frog" },
  { emoji: "🐧", name: "Penguin" },
  { emoji: "🦁", name: "Lion" },
  { emoji: "🐮", name: "Cow" },
];

const FRUITS = [
  { emoji: "🍌", name: "Banana" },
  { emoji: "🥕", name: "Carrot" },
  { emoji: "🍇", name: "Grapes" },
  { emoji: "🎋", name: "Bamboo" },
  { emoji: "🍉", name: "Watermelon" },
  { emoji: "🐟", name: "Fish" },
  { emoji: "🍖", name: "Meat" },
  { emoji: "🌽", name: "Corn" },
];

export type Animal = typeof ANIMALS[number];
export type Fruit = typeof FRUITS[number];

interface EmojiSelectorProps {
  label: string;
  selected: Animal | Fruit;
  onSelect: (selection: Animal | Fruit) => void;
  disabledSelections?: (Animal | Fruit)[];
  type: "animal" | "fruit";
}

export default function EmojiSelector({ label, selected, onSelect, disabledSelections = [], type }: EmojiSelectorProps) {
  const options = type === "animal" ? ANIMALS : FRUITS;
  
  return (
    <div className="mb-4">
      <div className="font-semibold mb-2 text-lg text-center">{label}</div>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => {
          const isSelected = selected.emoji === option.emoji;
          const isDisabled = disabledSelections.some((s) => s.emoji === option.emoji);
          return (
            <button
              key={option.emoji}
              className={`text-3xl md:text-4xl p-3 rounded-lg border-2 transition-all duration-150 flex flex-col items-center justify-center min-w-[64px] min-h-[64px] shadow-sm
                ${isSelected ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : "border-gray-300 bg-white dark:bg-gray-800"}
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"}
              `}
              onClick={() => !isDisabled && onSelect(option)}
              disabled={isDisabled}
              aria-label={`Select ${option.name}`}
            >
              <span>{option.emoji}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 text-center text-xl">
        <span className="mr-2">Selected:</span>
        <span className="text-2xl">{selected.emoji}</span>
      </div>
    </div>
  );
}

export { ANIMALS, FRUITS }; 