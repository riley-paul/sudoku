import type { Puzzle } from "./types";

export function parsePuzzle(value: string): Puzzle {
  const values = value.split("");
  const puzzle: Puzzle = {} as Puzzle;

  if (values.length !== 81) {
    throw new Error(
      "Invalid puzzle string: must be exactly 81 characters long",
    );
  }

  const rows = "ABCDEFGHI";
  const cols = "123456789";

  for (let i = 0; i < values.length; i++) {
    if (!/[1-9.]/.test(values[i])) {
      throw new Error(
        `Invalid character at position ${i}: must be a digit 1-9 or a dot for empty squares`,
      );
    }

    const row = rows[Math.floor(i / 9)];
    const col = cols[i % 9];
    const square = `${row}${col}` as keyof Puzzle;

    puzzle[square] = values[i] as Puzzle[typeof square];
  }

  return puzzle;
}

function setCharAt(str: string, index: number, chr: string): string {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

export function printPuzzle(puzzle: Puzzle, printIds = false): string {
  const rows = "ABCDEFGHI";
  const cols = "123456789";
  let result = "";

  let rowSeparator = "-".repeat(printIds ? 30 : 21) + "\n";
  rowSeparator = setCharAt(rowSeparator, printIds ? 9 : 6, "+");
  rowSeparator = setCharAt(rowSeparator, printIds ? 20 : 14, "+");

  for (const row of rows) {
    let rowStr = "";
    for (const col of cols) {
      const square = `${row}${col}` as keyof Puzzle;
      if (printIds) {
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
