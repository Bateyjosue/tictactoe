"use client";
import React, { useState } from "react";
import EmojiSelector, { EmojiCombo } from "./components/EmojiSelector";
import GridSizeSelector from "./components/GridSizeSelector";
import TicTacToeBoard from "./components/TicTacToeBoard";
import ThemeToggle from "./components/ThemeToggle";

const DEFAULT_PLAYER1 = { animal: "🐒", fruit: "🍌" };
const DEFAULT_PLAYER2 = { animal: "🐰", fruit: "🥕" };

export default function HomePage() {
  const [player1, setPlayer1] = useState<EmojiCombo>(DEFAULT_PLAYER1);
  const [player2, setPlayer2] = useState<EmojiCombo>(DEFAULT_PLAYER2);
  const [gridSize, setGridSize] = useState(3);
  const [gameKey, setGameKey] = useState(0); // for resetting board

  // Prevent duplicate emoji combos
  const disabledForP1 = [player2];
  const disabledForP2 = [player1];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <ThemeToggle />
      <div className="w-full max-w-md mx-auto p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">Emoji Tic Tac Toe</h1>
        <p className="mb-4 text-center text-gray-700 dark:text-gray-300 text-base md:text-lg">
          Choose your animal & fruit combo, pick a grid size, and play!<br />
          Tap a cell to make your move. First to complete a row, column, or diagonal wins.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-4 mb-2">
          <div className="flex-1">
            <EmojiSelector
              label="Player 1"
              selected={player1}
              onSelect={setPlayer1}
              disabledCombos={disabledForP1}
            />
          </div>
          <div className="flex-1">
            <EmojiSelector
              label="Player 2"
              selected={player2}
              onSelect={setPlayer2}
              disabledCombos={disabledForP2}
            />
          </div>
        </div>
        <GridSizeSelector value={gridSize} onChange={setGridSize} />
        <div className="w-full flex flex-col items-center mt-2">
          <TicTacToeBoard
            key={`${gridSize}-${player1.animal}${player1.fruit}-${player2.animal}${player2.fruit}-${gameKey}`}
            size={gridSize}
            player1={player1}
            player2={player2}
            onReset={() => setGameKey((k) => k + 1)}
          />
        </div>
      </div>
    </main>
  );
}
