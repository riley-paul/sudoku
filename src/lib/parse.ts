import { COLS, ROWS } from "./const";
import type { Puzzle } from "./types";
import { getSquare } from "./utils";

/**
 * Parses a Sudoku puzzle from a string representation.
 * The input string should be exactly 81 characters long, where each character represents a cell in the Sudoku grid.
 * Digits 1-9 represent given values, and dots (.) represent empty cells.
 *
 * @param value - The string representation of the Sudoku puzzle.
 * @returns A Puzzle object representing the parsed Sudoku grid.
 * @throws Will throw an error if the input string is not exactly 81 characters long or contains invalid characters.
 */
export function parsePuzzle(value: string): Puzzle {
  const values = value.split("");
  const puzzle: Puzzle = {} as Puzzle;

  if (values.length !== 81) {
    throw new Error(
      "Invalid puzzle string: must be exactly 81 characters long",
    );
  }

  for (let i = 0; i < values.length; i++) {
    if (!/[1-9.]/.test(values[i])) {
      throw new Error(
        `Invalid character at position ${i}: must be a digit 1-9 or a dot for empty squares`,
      );
    }

    const row = ROWS[Math.floor(i / 9)];
    const col = COLS[i % 9];
    const square = getSquare(row, col);

    const value = values[i];

    puzzle[square] = value === "." ? null : (value as Puzzle[typeof square]);
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
export function printPuzzle(puzzle: Puzzle, printCell = false): string {
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
