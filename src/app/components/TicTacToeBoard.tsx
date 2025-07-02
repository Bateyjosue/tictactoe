"use client";
import React, { useEffect, useState } from "react";
import type { EmojiCombo } from "./EmojiSelector";

interface TicTacToeBoardProps {
  size: number;
  player1: EmojiCombo;
  player2: EmojiCombo;
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

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-lg font-semibold">
        {winner ? (
          <span>
            Winner: <span className="text-2xl">{winner.player === 1 ? player1.animal + player1.fruit : player2.animal + player2.fruit}</span>
          </span>
        ) : draw ? (
          <span>Draw! No more moves.</span>
        ) : (
          <span>
            Turn: <span className="text-2xl">{turn === 1 ? player1.animal + player1.fruit : player2.animal + player2.fruit}</span>
          </span>
        )}
      </div>
      <div
        className="grid bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(48px, 64px))`,
          gridTemplateRows: `repeat(${size}, minmax(48px, 64px))`,
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={i + "-" + j}
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl border-2 border-gray-400 dark:border-gray-600 transition-all duration-150
                ${cell ? "cursor-default" : "hover:bg-blue-100 dark:hover:bg-blue-900"}
                ${isWinningCell(i, j) ? "bg-green-200 dark:bg-green-800 animate-pulse" : ""}
                ${winner || draw ? "opacity-70" : ""}
              `}
              onClick={() => handleCellClick(i, j)}
              disabled={!!cell || !!winner || draw}
              aria-label={`Cell ${i + 1},${j + 1}`}
            >
              {cell === 1 ? (
                <span>{player1.animal}{player1.fruit}</span>
              ) : cell === 2 ? (
                <span>{player2.animal}{player2.fruit}</span>
              ) : null}
            </button>
          ))
        )}
      </div>
      <button
        className="mt-4 px-6 py-2 rounded-lg bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition-all"
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  );
} 