import type { Digit, Row, Square, Unit } from "./types";
import { getSquare } from "./utils";

const cross = (rows: Row[], cols: Digit[]): Square[] => {
  const squares: Square[] = [];
  for (const r of rows) {
    for (const c of cols) {
      squares.push(getSquare(r, c));
    }
  }
  return squares;
};

export const ROWS: Row[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
export const COLS: Digit[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const SQUARES: Square[] = cross(ROWS, COLS);

const BOX_ROWS: Row[][] = [
  ["A", "B", "C"],
  ["D", "E", "F"],
  ["G", "H", "I"],
];
const BOX_COLS: Digit[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export const ALL_BOXES: Unit[] = BOX_ROWS.flatMap((rs) =>
  BOX_COLS.map((cs) => cross(rs, cs)),
);

export const ALL_UNITS: Unit[] = [
  ...ALL_BOXES,
  ...ROWS.map((r) => cross([r], COLS)),
  ...COLS.map((c) => cross(ROWS, [c])),
];

export const UNITS: Record<Square, Unit[]> = SQUARES.reduce(
  (acc, val) => {
    acc[val] = ALL_UNITS.filter((unit) => unit.includes(val));
    return acc;
  },
  {} as Record<Square, Unit[]>,
);
