import type { Digit, Row, Square } from "./types";

export const getSquare = (row: Row, col: Digit): Square => `${row}${col}`;

export const cross = (rows: Row[], cols: Digit[]): Square[] => {
  const squares: Square[] = [];
  for (const r of rows) {
    for (const c of cols) {
      squares.push(getSquare(r, c));
    }
  }
  return squares;
};
