"use client";
import React from "react";
import EmojiSelector, { Animal, Fruit } from "./EmojiSelector";
import GridSizeSelector from "./GridSizeSelector";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player1: Animal;
  player2: Fruit;
  gridSize: number;
  onPlayer1Change: (animal: Animal) => void;
  onPlayer2Change: (fruit: Fruit) => void;
  onGridSizeChange: (size: number) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  player1,
  player2,
  gridSize,
  onPlayer1Change,
  onPlayer2Change,
  onGridSizeChange,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Game Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              aria-label="Close settings"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <EmojiSelector
              label="Player 1 (Animal)"
              selected={player1}
              onSelect={onPlayer1Change}
              type="animal"
            />
            
            <EmojiSelector
              label="Player 2 (Fruit)"
              selected={player2}
              onSelect={onPlayer2Change}
              type="fruit"
            />
            
            <GridSizeSelector
              value={gridSize}
              onChange={onGridSizeChange}
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Apply Settings
            </button>
          </div>
          
          {/* Developer Credit */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Made with ❤️ by{" "}
              <a 
                href="https://josuebatey.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              >
                Josue Batey
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 