import type { Digit, Row, Square } from "./types";

export const getSquare = (row: Row, col: Digit): Square => `${row}${col}`;
