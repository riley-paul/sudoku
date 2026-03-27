import type { Digit, Row, Square } from "./types";
import { getSquare } from "./utils";

const cross = (rows: Row[], cols: Digit[]): Square[] => {
  const squares: Square[] = [];
  for (const r of rows) {
    for (const c of cols) {
      squares.push(getSquare(r, c));
    }
  }
  return squares;
};
