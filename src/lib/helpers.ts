import type { Cell, Cells } from "./types";

export const getId = (row: number, col: number) => `r${row}c${col}`;

export const getRow = (cells: Cells, row: number) =>
  Object.values(cells).filter((cell) => cell.row === row);

export const getCol = (cells: Cells, col: number) =>
  Object.values(cells).filter((cell) => cell.col === col);

export const getBox = (cells: Cells, box: number) =>
  Object.values(cells).filter((cell) => cell.box === box);

export const getRandomValue = () => Math.floor(Math.random() * 9) + 1;

export const GRID = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 9 }, (_, col) => getId(row, col)),
);

export const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

export function hasConflict(cells: Cells, cell: Cell): boolean {
  if (!cell.value) return false;

  const peers = Object.values(cells).filter(
    (c) =>
      c.id !== cell.id &&
      (c.row === cell.row || c.col === cell.col || c.box === cell.box),
  );

  return peers.some((c) => c.value === cell.value);
}
