import { COLS, ROWS, SQUARES } from "./const";
import type { DigitSet, Grid } from "./types";
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
    console.log(values[i]);
    const digits = new Set(values[i].match(/[1-9]/g) || []) as DigitSet;

    puzzle[SQUARES[i]] = digits;
  }

  return puzzle;
}

function setCharAt(str: string, index: number, chr: string): string {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

/**
 * Converts a Puzzle object into a human-readable string format.
 * The output string will display the Sudoku grid with optional square IDs.
 *
 * @param puzzle - The Puzzle object to be printed.
 * @param printCell - If true, the output will include square IDs instead of values. Defaults to false.
 * @returns A string representation of the Sudoku grid.
 */
export function printPuzzle(puzzle: Grid, printCell = false): string {
  let result = "";

  let rowSeparator = "-".repeat(printCell ? 30 : 21) + "\n";
  rowSeparator = setCharAt(rowSeparator, printCell ? 9 : 6, "+");
  rowSeparator = setCharAt(rowSeparator, printCell ? 20 : 14, "+");

  for (const row of ROWS) {
    let rowStr = "";
    for (const col of COLS) {
      const square = getSquare(row, col);
      if (printCell) {
        rowStr += square + " ";
      } else {
        rowStr += (puzzle[square] || ".") + " ";
      }
      if (col === "3" || col === "6") rowStr += "| ";
    }
    result += rowStr.trim() + "\n";
    if (row === "C" || row === "F") result += rowSeparator;
  }
  return result;
}
