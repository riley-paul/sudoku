import type { Digit, Square } from "@/sudoku/types";
import type { Squares } from "./types";
import { PEERS, SQUARES } from "@/sudoku/const";

export const isInvalidMove = (squares: Squares, s: Square, v: Digit) => {
  const squaresWithValue = SQUARES.filter((i) => squares[i].value === v);
  return squaresWithValue.some((i) => PEERS[s].has(i));
};
