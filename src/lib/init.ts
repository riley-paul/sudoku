import { getId, getRandomValue } from "./helpers";
import type { Cell, Cells } from "./types";

export function initCell(row: number, col: number): Cell {
  const id = getId(row, col);
  const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);

  const given = Math.random() > 0.5; // Randomly decide if the cell is given or not

  return {
    id,
    row,
    col,
    box,
    value: given ? getRandomValue() : null,
    given,
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
