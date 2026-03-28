import type { Digit, Grid } from "@/sudoku/types";
import type { Squares } from "./types";
import { getSquare } from "@/sudoku/utils";
import { COLS, ROWS, STARTING_GRID } from "@/sudoku/const";

export function squaresToGrid(squares: Squares): Grid {
  const grid = { ...STARTING_GRID };

  for (const square of Object.values(squares)) {
    if (square.value) {
      grid[square.id] = new Set([square.value]);
    } else {
      grid[square.id] = new Set(square.notes);
    }
  }

  return grid;
}

export function gridToSquares(grid: Grid): Squares {
  const squares = {} as Squares;

  for (const row of ROWS) {
    for (const col of COLS) {
      const id = getSquare(row, col);
      const isFilled = grid[id].size === 1;
      const [value] = [...grid[id]];

      squares[id] = {
        id,
        row,
        col,
        value: isFilled ? value : null,
        given: isFilled,
        notes: isFilled ? new Set<Digit>() : new Set(grid[id]),
      };
    }
  }

  return squares;
}
