import type { Squares } from "./types";

export const stringifySquares = (squares: Squares): string => {
  return JSON.stringify(squares, (key, value) => {
    if (key === "notes" && value instanceof Set) {
      return [...value];
    }
    return value;
  });
};

export const parseSquares = (squaresStr: string): Squares => {
  return JSON.parse(squaresStr, (key, value) => {
    if (key === "notes" && Array.isArray(value)) {
      return new Set(value);
    }
    return value;
  });
};
