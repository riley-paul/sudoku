import type { Digit, Square } from "@/sudoku/types";
import type { Squares } from "./types";
import { ALL_UNITS, PEERS, SQUARES } from "@/sudoku/const";

export const isInvalidMove = (squares: Squares, s: Square, v: Digit) => {
  const squaresWithValue = SQUARES.filter((i) => squares[i].value === v);
  return squaresWithValue.some((i) => PEERS[s].has(i));
};

export const isPuzzleComplete = (squares: Squares) => {
  const everySquareFilled = SQUARES.every((s) => squares[s].value !== null);
  const everyUnitValid = ALL_UNITS.every((unit) => {
    const valuesInUnit = unit.map((s) => squares[s].value);
    const uniqueValues = new Set(valuesInUnit);
    return uniqueValues.size === 9 && !uniqueValues.has(null);
  });
  return everySquareFilled && everyUnitValid;
};
