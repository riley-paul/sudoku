import { COLS, ROWS, SQUARES } from "./const";
import type { Digit, DigitSet, Grid, Square } from "./types";
import { getSquare } from "./utils";

/**
 * Parses a Sudoku puzzle from a string representation.
 * Digits 1-9 represent given values, and dots (.) represent empty cells.
 * Digits within curly braces ({}) can be used to indicate candidate values for a cell.
 *
 * @param value - The string representation of the Sudoku puzzle.
 * @returns A Puzzle object representing the parsed Sudoku grid.
 * @throws Will throw an error if the input string is not exactly 81 characters long or contains invalid characters.
 */
export function parsePuzzle(picture: string): Grid {
  const values = picture.match(/[.1-9]|[{][1-9]+[}]/g) || [];

  if (values.length !== 81) {
    throw new Error(
      `Invalid puzzle string: must be exactly 81 characters long (found ${values.length} valid characters)`,
    );
  }

  const puzzle: Grid = SQUARES.reduce((acc, val) => {
    acc[val] = new Set();
    return acc;
  }, {} as Grid);

  for (let i = 0; i < values.length; i++) {
    const digits = new Set(values[i].match(/[1-9]/g) || []) as DigitSet;

    puzzle[SQUARES[i]] = digits;
  }

  return puzzle;
}

export function printGrid(grid: Record<Square, string>): string {
  let result = "";

  const colWidths: Record<Digit, number> = COLS.reduce(
    (acc, val) => {
      const rowWidths = ROWS.map((row) => grid[getSquare(row, val)].length);
      acc[val] = Math.max(...rowWidths, 1);
      return acc;
    },
    {} as Record<Digit, number>,
  );

  for (const row of ROWS) {
    let rowStr = "";
    for (const col of COLS) {
      const colWidth = colWidths[col];
      const square = getSquare(row, col);
      const value = grid[square];
      rowStr += value
        .padStart(value.length + Math.floor((colWidth - value.length) / 2))
        .padEnd(colWidth);

      if (col !== "9") rowStr += " ";
      if (col === "3" || col === "6") rowStr += "| ";
    }
    result += rowStr + "\n";

    if (row === "C" || row === "F") {
      let separator = "";
      COLS.forEach((col) => {
        separator += "-".repeat(colWidths[col] + 1);
        if (col === "4") separator += "-";
        if (col === "3" || col === "6") separator += "+";
      });
      result += separator + "\n";
    }
  }
  return result;
}

export function printSquares(): string {
  const values = SQUARES.reduce(
    (acc, val) => {
      acc[val] = val;
      return acc;
    },
    {} as Record<Square, string>,
  );

  return printGrid(values);
}

/**
 * Converts a Puzzle object into a human-readable string format.
 * The output string will display the Sudoku grid with optional square IDs.
 *
 * @param puzzle - The Puzzle object to be printed.
 * @returns A string representation of the Sudoku grid.
 */
export function printPuzzle(puzzle: Grid): string {
  const values = SQUARES.reduce(
    (acc, val) => {
      if (puzzle[val].size === 1) {
        acc[val] = [...puzzle[val]][0];
      } else if (puzzle[val].size > 1) {
        acc[val] = "{" + [...puzzle[val]].join("") + "}";
      } else {
        acc[val] = ".";
      }
      return acc;
    },
    {} as Record<Square, string>,
  );

  return printGrid(values);
}
