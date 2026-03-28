import type { Digit, Grid, Row, Square, Unit } from "./types";
import { cross } from "./utils";

export const EMPTY_PUZZLE_STRING = ".".repeat(81);

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

export const PEERS: Record<Square, Set<Square>> = SQUARES.reduce(
  (acc, val) => {
    const peers = new Set<Square>();
    UNITS[val].forEach((unit) =>
      unit.forEach((square) => {
        if (square !== val) {
          peers.add(square);
        }
      }),
    );
    acc[val] = peers;
    return acc;
  },
  {} as Record<Square, Set<Square>>,
);

export const STARTING_GRID: Grid = SQUARES.reduce((acc, val) => {
  acc[val] = new Set(COLS);
  return acc;
}, {} as Grid);
