import type { Cell } from "./types";

export function initCell(row: number, col: number): Cell {
  const id = `r${row}c${col}`;
  const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);

  return {
    id,
    row,
    col,
    box,
    value: null,
    given: false,
    notes: new Set(),
  };
}

export function initBoard(): Record<string, Cell> {
  const board: Record<string, Cell> = {};

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = initCell(row, col);
      board[cell.id] = cell;
    }
  }

  return board;
}
