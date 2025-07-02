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
    <main className="h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors overflow-hidden">
      {/* Header Controls */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img 
              src="/jb-logo.svg" 
              alt="JB Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
              Tic Tac Toe
            </h1>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
            <span>{player1.emoji} vs {player2.emoji}</span>
            <span>•</span>
            <span>{gridSize}×{gridSize}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm text-base transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Open settings"
          >
            ⚙️
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop Wrapper */}
      <div className="h-full pt-16 px-3 flex justify-center">
        <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center">
          {/* Game Status */}
          <div className="w-full max-w-lg mb-4 text-center">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl md:text-3xl">{player1.emoji}</div>
                  <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Player 1</div>
                </div>
                <div className="text-lg font-bold text-gray-500">VS</div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Player 2</div>
                  <div className="text-2xl md:text-3xl">{player2.emoji}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Grid Size: {gridSize} × {gridSize}
              </div>
            </div>
          </div>

          {/* Game Board - Main Focus */}
          <div className="w-full max-w-3xl flex justify-center flex-1">
            <TicTacToeBoard
              key={`${gridSize}-${player1.emoji}-${player2.emoji}-${gameKey}`}
              size={gridSize}
              player1={player1}
              player2={player2}
              onReset={() => setGameKey((k) => k + 1)}
            />
          </div>

          {/* Instructions */}
          <div className="w-full max-w-lg mt-4 mb-16 text-center">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Tap any cell to make your move. First to complete a row, column, or diagonal wins!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
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
