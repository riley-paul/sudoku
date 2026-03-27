import type { Digit } from "@/sudoku/types";
import type { Squares } from "./types";
import { getSquare } from "@/sudoku/utils";
import { parsePuzzle } from "@/sudoku/parse";
import { COLS, ROWS, STARTING_GRID } from "@/sudoku/const";

export function initSquares(print?: string): Squares {
  const puzzle = print ? parsePuzzle(print) : structuredClone(STARTING_GRID);
  const squares = {} as Squares;

  for (const row of ROWS) {
    for (const col of COLS) {
      const id = getSquare(row, col);
      const isFilled = puzzle[id].size === 1;
      const [value] = [...puzzle[id]];

      squares[id] = {
        id,
        row,
        col,
        value: isFilled ? value : null,
        given: isFilled,
        notes: isFilled ? new Set<Digit>() : new Set(puzzle[id]),
      };
    }
  }

  return squares;
}
