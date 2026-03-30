import type { Digit, Row, Square } from "@/sudoku/types";

export type SquareInfo = {
  id: Square;
  row: Row;
  col: Digit;

  value: Digit | null;
  solution: Digit;

  given: boolean; // pre-filled puzzle cell
  notes: Set<Digit>; // candidate numbers for the cell
};

export type Squares = Record<Square, SquareInfo>;
