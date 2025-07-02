"use client";
import React, { useState } from "react";
import TicTacToeBoard from "./components/TicTacToeBoard";
import ThemeToggle from "./components/ThemeToggle";
import SettingsModal from "./components/SettingsModal";
import { Animal, Fruit, ANIMALS, FRUITS } from "./components/EmojiSelector";

const DEFAULT_PLAYER1: Animal = ANIMALS[0]; // 🐒
const DEFAULT_PLAYER2: Fruit = FRUITS[0]; // 🍌

export default function HomePage() {
  const [player1, setPlayer1] = useState<Animal>(DEFAULT_PLAYER1);
  const [player2, setPlayer2] = useState<Fruit>(DEFAULT_PLAYER2);
  const [gridSize, setGridSize] = useState(3);
  const [gameKey, setGameKey] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <ThemeToggle />
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed top-4 right-16 z-50 p-2 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md text-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
        aria-label="Open settings"
      >
        ⚙️
      </button>
      
      <div className="w-full max-w-md mx-auto p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">Emoji Tic Tac Toe</h1>
        <p className="mb-4 text-center text-gray-700 dark:text-gray-300 text-base md:text-lg">
          Animal vs Fruit! Choose your emoji and grid size in settings.<br />
          Tap a cell to make your move. First to complete a row, column, or diagonal wins.
        </p>
        
        <div className="mb-4 text-center">
          <div className="text-2xl mb-2">
            <span className="mr-4">{player1.emoji} vs {player2.emoji}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {gridSize} x {gridSize} Grid
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center">
          <TicTacToeBoard
            key={`${gridSize}-${player1.emoji}-${player2.emoji}-${gameKey}`}
            size={gridSize}
            player1={player1}
            player2={player2}
            onReset={() => setGameKey((k) => k + 1)}
          />
        </div>
      </div>
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        player1={player1}
        player2={player2}
        gridSize={gridSize}
        onPlayer1Change={setPlayer1}
        onPlayer2Change={setPlayer2}
        onGridSizeChange={setGridSize}
      />
    </main>
  );
}
