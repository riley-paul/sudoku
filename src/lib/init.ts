import { getId } from "./helpers";
import type { Cell, Cells } from "./types";

export function initCell(row: number, col: number): Cell {
  const id = getId(row, col);
  const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);

  return {
    id,
    row,
    col,
    box,
    value: null,
    given: false,
    notes: [],
  };
}

export function initBoard(): Cells {
  const board: Cells = {};

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = initCell(row, col);
      board[cell.id] = cell;
    }
  }

  return board;
}
