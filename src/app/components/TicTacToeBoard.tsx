"use client";
import React, { useEffect, useState } from "react";
import type { Animal, Fruit } from "./EmojiSelector";

interface TicTacToeBoardProps {
  size: number;
  player1: Animal;
  player2: Fruit;
  onReset: () => void;
}

type Cell = null | 1 | 2;

type Winner = null | { player: 1 | 2; line: number[][] };

function checkWinner(board: Cell[][], size: number): Winner {
  // Check rows, columns, and diagonals
  for (let i = 0; i < size; i++) {
    // Rows
    if (
      board[i][0] !== null &&
      board[i].every((cell) => cell === board[i][0])
    ) {
      return { player: board[i][0] as 1 | 2, line: board[i].map((_, j) => [i, j]) };
    }
    // Columns
    if (
      board[0][i] !== null &&
      board.every((row) => row[i] === board[0][i])
    ) {
      return { player: board[0][i] as 1 | 2, line: board.map((_, j) => [j, i]) };
    }
  }
  // Diagonal TL-BR
  if (
    board[0][0] !== null &&
    Array.from({ length: size }).every((_, i) => board[i][i] === board[0][0])
  ) {
    return { player: board[0][0] as 1 | 2, line: Array.from({ length: size }, (_, i) => [i, i]) };
  }
  // Diagonal TR-BL
  if (
    board[0][size - 1] !== null &&
    Array.from({ length: size }).every((_, i) => board[i][size - 1 - i] === board[0][size - 1])
  ) {
    return { player: board[0][size - 1] as 1 | 2, line: Array.from({ length: size }, (_, i) => [i, size - 1 - i]) };
  }
  return null;
}

export default function TicTacToeBoard({ size, player1, player2, onReset }: TicTacToeBoardProps) {
  const [board, setBoard] = useState<Cell[][]>(Array.from({ length: size }, () => Array(size).fill(null)));
  const [turn, setTurn] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<Winner>(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
    setTurn(1);
    setWinner(null);
    setDraw(false);
  }, [size, player1, player2]);

  useEffect(() => {
    const win = checkWinner(board, size);
    if (win) {
      setWinner(win);
    } else if (board.flat().every((cell) => cell)) {
      setDraw(true);
    }
  }, [board, size]);

  function handleCellClick(i: number, j: number) {
    if (board[i][j] || winner || draw) return;
    setBoard((prev) => {
      const next = prev.map((row) => [...row]);
      next[i][j] = turn;
      return next;
    });
    setTurn((prev) => (prev === 1 ? 2 : 1));
  }

  function isWinningCell(i: number, j: number): boolean {
    return winner?.line.some(([x, y]) => x === i && y === j) ?? false;
  }

  function handleReset() {
    setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
    setTurn(1);
    setWinner(null);
    setDraw(false);
    onReset();
  }

  // Calculate responsive cell sizes
  const getCellSize = () => {
    if (size <= 3) return "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28";
    if (size <= 4) return "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24";
    if (size <= 5) return "w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22";
    return "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20";
  };

  const getEmojiSize = () => {
    if (size <= 3) return "text-3xl md:text-4xl lg:text-5xl";
    if (size <= 4) return "text-2xl md:text-3xl lg:text-4xl";
    if (size <= 5) return "text-xl md:text-2xl lg:text-3xl";
    return "text-lg md:text-xl lg:text-2xl";
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Game Status */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 min-w-[300px]">
        {winner ? (
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              🎉 Winner! 🎉
            </div>
            <div className="text-4xl md:text-5xl mb-2">
              {winner.player === 1 ? player1.emoji : player2.emoji}
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {winner.player === 1 ? "Player 1" : "Player 2"} wins!
            </div>
          </div>
        ) : draw ? (
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              🤝 It&apos;s a Draw! 🤝
            </div>
            <div className="text-lg text-gray-500 dark:text-gray-500">
              No more moves available
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">Current Turn</div>
            <div className="text-4xl md:text-5xl mb-2">
              {turn === 1 ? player1.emoji : player2.emoji}
            </div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {turn === 1 ? "Player 1" : "Player 2"}
            </div>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div
          className="grid bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-inner overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
            gap: "2px",
            padding: "2px",
          }}
        >
          {board.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={i + "-" + j}
                className={`${getCellSize()} flex items-center justify-center ${getEmojiSize()} bg-white dark:bg-gray-800 border-0 transition-all duration-200
                  ${cell ? "cursor-default" : "hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95"}
                  ${isWinningCell(i, j) ? "bg-green-200 dark:bg-green-800 animate-pulse shadow-lg" : ""}
                  ${winner || draw ? "opacity-80" : ""}
                `}
                onClick={() => handleCellClick(i, j)}
                disabled={!!cell || !!winner || draw}
                aria-label={`Cell ${i + 1},${j + 1}`}
              >
                {cell === 1 ? (
                  <span className="drop-shadow-sm">{player1.emoji}</span>
                ) : cell === 2 ? (
                  <span className="drop-shadow-sm">{player2.emoji}</span>
                ) : null}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
        onClick={handleReset}
      >
        🔄 New Game
      </button>
    </div>
  );
} 