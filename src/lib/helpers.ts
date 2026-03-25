export const getId = (row: number, col: number) => `r${row}c${col}`;

export const GRID = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 9 }, (_, col) => getId(row, col)),
);
