import { describe, it, expect } from "vitest";
import { parsePuzzle, printPuzzle } from "./parse";
import { constrain, isSolution } from "./solve";

describe("solve", () => {
  describe("isSolution", () => {
    it("should return true for a solution", () => {
      const solution = parsePuzzle(`
        5 3 4 | 6 7 8 | 9 1 2
        6 7 2 | 1 9 5 | 3 4 8
        1 9 8 | 3 4 2 | 5 6 7
        ------+-------+------
        8 5 9 | 7 6 1 | 4 2 3
        4 2 6 | 8 5 3 | 7 9 1
        7 1 3 | 9 2 4 | 8 5 6
        ------+-------+------
        9 6 1 | 5 3 7 | 2 8 4
        2 8 7 | 4 1 9 | 6 3 5
        3 4 5 | 2 8 6 | 1 7 9
        `);
      const puzzle = parsePuzzle(`
        5 3 .|. 7 .|. . .
        6 . .|1 9 5|. . .
        . 9 8|. . .|. 6 .
        -----+-----+-----
        8 . .|. 6 .|. . 3
        4 . .|8 . 3|. . 1
        7 . .|. 2 .|. . 6
        -----+-----+-----
        . 6 .|. . .|2 8 .
        . . .|4 1 9|. . 5
        . . .|. 8 .|. 7 9
        `);

      expect(isSolution(solution, puzzle)).toBe(true);
    });

    it("should return false when solution differs from puzzle", () => {
      const solution = parsePuzzle(`
        4 1 7|3 6 9|8 2 5
        6 3 2|1 5 8|9 4 7
        9 5 8|7 2 4|3 1 6
        -----+-----+-----
        8 2 5|4 3 7|1 6 9
        7 9 1|5 8 6|4 3 2
        3 4 6|9 1 2|7 5 8
        -----+-----+-----
        2 8 9|6 4 3|5 7 1
        5 7 3|2 9 1|6 8 4
        1 6 4|8 7 5|2 9 3
        `);
      const puzzle = parsePuzzle(`
        5 3 .|. 7 .|. . .
        6 . .|1 9 5|. . .
        . 9 8|. . .|. 6 .
        -----+-----+-----
        8 . .|. 6 .|. . 3
        4 . .|8 . 3|. . 1
        7 . .|. 2 .|. . 6
        -----+-----+-----
        . 6 .|. . .|2 8 .
        . . .|4 1 9|. . 5
        . . .|. 8 .|. 7 9
        `);

      expect(isSolution(solution, puzzle)).toBe(false);
    });

    it("should return false when solution is invalid", () => {
      const solution = parsePuzzle(`
        5 3 4 | 6 7 8 | 9 2 1
        6 7 2 | 1 9 5 | 3 4 8
        1 9 8 | 3 4 2 | 5 6 7
        ------+-------+------
        8 5 9 | 7 6 1 | 4 2 3
        4 2 6 | 8 5 3 | 7 9 1
        7 1 3 | 9 2 4 | 8 5 6
        ------+-------+------
        9 6 1 | 5 3 7 | 2 8 4
        2 8 7 | 4 1 9 | 6 3 5
        3 4 5 | 2 8 6 | 1 7 9
        `);
      const puzzle = parsePuzzle(`
        5 3 .|. 7 .|. . .
        6 . .|1 9 5|. . .
        . 9 8|. . .|. 6 .
        -----+-----+-----
        8 . .|. 6 .|. . 3
        4 . .|8 . 3|. . 1
        7 . .|. 2 .|. . 6
        -----+-----+-----
        . 6 .|. . .|2 8 .
        . . .|4 1 9|. . 5
        . . .|. 8 .|. 7 9
        `);

      expect(isSolution(solution, puzzle)).toBe(false);
    });
  });

  describe("constrain", () => {
    it("should constrain a puzzle", () => {
      const grid = parsePuzzle(
        "4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......",
      );
      console.log(printPuzzle(grid));

      const constrained = constrain(grid);
      console.log(printPuzzle(constrained));
    });
  });
});
