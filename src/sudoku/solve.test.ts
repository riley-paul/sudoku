import { describe, it, expect } from "vitest";
import { parsePuzzle, printSideBySide } from "./parse";
import { constrain, isSolution, search } from "./solve";

import puzzleDataTop95 from "./test-puzzles/top95.txt?raw";

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
    it("should solve a simple puzzle with just contrain", () => {
      const puzzle = parsePuzzle(
        `5 3 .|. 7 .|. . .
        6 . .|1 9 5|. . .
        . 9 8|. . .|. 6 .
        -----+-----+-----
        8 . .|. 6 .|. . 3
        4 . .|8 . 3|. . 1
        7 . .|. 2 .|. . 6
        -----+-----+-----
        . 6 .|. . .|2 8 .
        . . .|4 1 9|. . 5
        . . .|. 8 .|. 7 9 `,
      );
      const constrained = constrain(puzzle);
      expect(isSolution(constrained, puzzle)).toBe(true);
    });

    it("should not solve a complex puzzle with just contrain", () => {
      const puzzle = parsePuzzle(`
        4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......
        `);
      const partialSolution = parsePuzzle(`
        4       {1679}   {12679} |  {139}     {2369}    {269}  |    8       {1239}      5
      {26789}      3     {1256789}| {14589}   {24569}   {245689}| {12679}    {1249}   {124679}
       {2689}   {15689}   {125689}|    7      {234569}  {245689}| {12369}   {12349}   {123469}
     -----------------------------+-----------------------------+-----------------------------
       {3789}      2      {15789} |  {3459}   {34579}    {4579} | {13579}      6      {13789}
       {3679}   {15679}   {15679} |  {359}       8      {25679} |    4      {12359}   {12379}
      {36789}      4      {56789} |  {359}       1      {25679} | {23579}   {23589}   {23789}
     -----------------------------+-----------------------------+-----------------------------
       {289}      {89}     {289}  |    6       {459}       3    |  {1259}      7      {12489}
         5       {6789}      3    |    2       {479}       1    |   {69}     {489}     {4689}
         1       {6789}      4    |  {589}     {579}     {5789} | {23569}   {23589}   {23689}
        `);

      const constrained = constrain(puzzle);
      expect(isSolution(constrained, puzzle)).toBe(false);
      expect(constrained).toEqual(partialSolution);
    });
  });

  describe("search", () => {
    it("should solve challenging puzzle", () => {
      const puzzle = parsePuzzle(`
        4 . .|. . .|8 . 5
        . 3 .|. . .|. . .
        . . .|7 . .|. . .
        -----+-----+-----
        . 2 .|. . .|. 6 .
        . . .|. 8 .|4 . .
        . . .|. 1 .|. . .
        -----+-----+-----
        . . .|6 . 3|. 7 .
        5 . .|2 . .|. . .
        1 . 4|. . .|. . .
        `);
      const puzzleSolution = parsePuzzle(`
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

      const solution = search(constrain(puzzle));
      expect(isSolution(solution, puzzle)).toBe(true);
      expect(solution).toEqual(puzzleSolution);
    });

    it("should solve top 95 puzzles", async () => {
      puzzleDataTop95.split("\n").forEach((line, index) => {
        const puzzle = parsePuzzle(line);
        const solution = search(constrain(puzzle));
        expect(isSolution(solution, puzzle)).toBe(true);
      });
    });
  });
});
