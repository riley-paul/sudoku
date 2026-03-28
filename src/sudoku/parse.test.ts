import { describe, expect, it } from "vitest";
import { parseGrid, printPuzzle, printSquares } from "./parse";

const input =
  "....7..2.8.......6.1.2.5...9.54....8....  \n.....3....85.1...3.2.8.4.......9.7..6....";

const inputWithCandidates =
  "{124}...7..2.8. ......6.1.2.5...9.54....8...  ..{5679}...3....85.1...3.2.8.4.......9.7..6....";

const expected = {
  A1: new Set(),
  A2: new Set(),
  A3: new Set(),
  A4: new Set(),
  A5: new Set(["7"]),
  A6: new Set(),
  A7: new Set(),
  A8: new Set(["2"]),
  A9: new Set(),
  B1: new Set(["8"]),
  B2: new Set(),
  B3: new Set(),
  B4: new Set(),
  B5: new Set(),
  B6: new Set(),
  B7: new Set(),
  B8: new Set(),
  B9: new Set(["6"]),
  C1: new Set(),
  C2: new Set(["1"]),
  C3: new Set(),
  C4: new Set(["2"]),
  C5: new Set(),
  C6: new Set(["5"]),
  C7: new Set(),
  C8: new Set(),
  C9: new Set(),
  D1: new Set(["9"]),
  D2: new Set(),
  D3: new Set(["5"]),
  D4: new Set(["4"]),
  D5: new Set(),
  D6: new Set(),
  D7: new Set(),
  D8: new Set(),
  D9: new Set(["8"]),
  E1: new Set(),
  E2: new Set(),
  E3: new Set(),
  E4: new Set(),
  E5: new Set(),
  E6: new Set(),
  E7: new Set(),
  E8: new Set(),
  E9: new Set(),
  F1: new Set(["3"]),
  F2: new Set(),
  F3: new Set(),
  F4: new Set(),
  F5: new Set(),
  F6: new Set(["8"]),
  F7: new Set(["5"]),
  F8: new Set(),
  F9: new Set(["1"]),
  G1: new Set(),
  G2: new Set(),
  G3: new Set(),
  G4: new Set(["3"]),
  G5: new Set(),
  G6: new Set(["2"]),
  G7: new Set(),
  G8: new Set(["8"]),
  G9: new Set(),
  H1: new Set(["4"]),
  H2: new Set(),
  H3: new Set(),
  H4: new Set(),
  H5: new Set(),
  H6: new Set(),
  H7: new Set(),
  H8: new Set(),
  H9: new Set(["9"]),
  I1: new Set(),
  I2: new Set(["7"]),
  I3: new Set(),
  I4: new Set(),
  I5: new Set(["6"]),
  I6: new Set(),
  I7: new Set(),
  I8: new Set(),
  I9: new Set(),
};

const expectedWithCandidates = {
  A1: new Set(["1", "2", "4"]),
  A2: new Set(),
  A3: new Set(),
  A4: new Set(),
  A5: new Set(["7"]),
  A6: new Set(),
  A7: new Set(),
  A8: new Set(["2"]),
  A9: new Set(),
  B1: new Set(["8"]),
  B2: new Set(),
  B3: new Set(),
  B4: new Set(),
  B5: new Set(),
  B6: new Set(),
  B7: new Set(),
  B8: new Set(),
  B9: new Set(["6"]),
  C1: new Set(),
  C2: new Set(["1"]),
  C3: new Set(),
  C4: new Set(["2"]),
  C5: new Set(),
  C6: new Set(["5"]),
  C7: new Set(),
  C8: new Set(),
  C9: new Set(),
  D1: new Set(["9"]),
  D2: new Set(),
  D3: new Set(["5"]),
  D4: new Set(["4"]),
  D5: new Set(),
  D6: new Set(),
  D7: new Set(),
  D8: new Set(),
  D9: new Set(["8"]),
  E1: new Set(),
  E2: new Set(),
  E3: new Set(),
  E4: new Set(),
  E5: new Set(),
  E6: new Set(["5", "6", "7", "9"]),
  E7: new Set(),
  E8: new Set(),
  E9: new Set(),
  F1: new Set(["3"]),
  F2: new Set(),
  F3: new Set(),
  F4: new Set(),
  F5: new Set(),
  F6: new Set(["8"]),
  F7: new Set(["5"]),
  F8: new Set(),
  F9: new Set(["1"]),
  G1: new Set(),
  G2: new Set(),
  G3: new Set(),
  G4: new Set(["3"]),
  G5: new Set(),
  G6: new Set(["2"]),
  G7: new Set(),
  G8: new Set(["8"]),
  G9: new Set(),
  H1: new Set(["4"]),
  H2: new Set(),
  H3: new Set(),
  H4: new Set(),
  H5: new Set(),
  H6: new Set(),
  H7: new Set(),
  H8: new Set(),
  H9: new Set(["9"]),
  I1: new Set(),
  I2: new Set(["7"]),
  I3: new Set(),
  I4: new Set(),
  I5: new Set(["6"]),
  I6: new Set(),
  I7: new Set(),
  I8: new Set(),
  I9: new Set(),
};

const inputFormatted = `
. . . | . 7 . | . 2 .
8 . . | . . . | . . 6
. 1 . | 2 . 5 | . . .
------+-------+------
9 . 5 | 4 . . | . . 8
. . . | . . . | . . .
3 . . | . . 8 | 5 . 1
------+-------+------
. . . | 3 . 2 | . 8 .
4 . . | . . . | . . 9
. 7 . | . 6 . | . . .
`;

const inputFormattedWithCandidates = `
{124} . . | . 7   .    | . 2 .
  8   . . | . .   .    | . . 6
  .   1 . | 2 .   5    | . . .
----------+------------+------
  9   . 5 | 4 .   .    | . . 8
  .   . . | . . {5679} | . . .
  3   . . | . .   8    | 5 . 1
----------+------------+------
  .   . . | 3 .   2    | . 8 .
  4   . . | . .   .    | . . 9
  .   7 . | . 6   .    | . . .
`;

describe("parse", () => {
  describe("parseGrid", () => {
    it("should parse a sudoku string into a puzzle object", () => {
      expect(parseGrid(input)).toEqual(expected);
      expect(parseGrid(inputFormatted)).toEqual(expected);
      expect(parseGrid(inputFormattedWithCandidates)).toEqual(
        expectedWithCandidates,
      );
    });

    it("should parse a sudoku string into a puzzle object with candidates", () => {
      const result = parseGrid(inputWithCandidates);
      expect(result).toEqual(expectedWithCandidates);
    });

    it("should throw an error if the input string is not 81 characters long", () => {
      expect(() => parseGrid("short")).toThrow(
        "Invalid puzzle string: must be exactly 81 characters long (found 0 valid characters)",
      );
    });

    it("should throw an error if the input string contains invalid characters", () => {
      const testString =
        "....7..2.8....z..6.1.2.5...9.54....8.........3....85.1...3.2.8.4.......9.7..6....";
      expect(() => parseGrid(testString)).toThrow(
        "Invalid puzzle string: must be exactly 81 characters long (found 80 valid characters)",
      );
    });
  });

  describe("printPuzzle", () => {
    it("should print a puzzle in a human-readable format", () => {
      const puzzle = parseGrid(input);
      const expected = `
. . . | . 7 . | . 2 .
8 . . | . . . | . . 6
. 1 . | 2 . 5 | . . .
------+-------+------
9 . 5 | 4 . . | . . 8
. . . | . . . | . . .
3 . . | . . 8 | 5 . 1
------+-------+------
. . . | 3 . 2 | . 8 .
4 . . | . . . | . . 9
. 7 . | . 6 . | . . .
`;
      const printed = printPuzzle(puzzle);
      expect(printed.trim()).toBe(expected.trim());
    });

    it("should print a puzzle with candidates in a human-readable format", () => {
      const puzzle = parseGrid(inputWithCandidates);

      const printed = printPuzzle(puzzle);
      expect(printed.trim()).toBe(inputFormattedWithCandidates.trim());
    });
  });

  describe("printSquares", () => {
    it("should print a puzzle with cell IDs", () => {
      const expected = `
A1 A2 A3 | A4 A5 A6 | A7 A8 A9
B1 B2 B3 | B4 B5 B6 | B7 B8 B9
C1 C2 C3 | C4 C5 C6 | C7 C8 C9
---------+----------+---------
D1 D2 D3 | D4 D5 D6 | D7 D8 D9
E1 E2 E3 | E4 E5 E6 | E7 E8 E9
F1 F2 F3 | F4 F5 F6 | F7 F8 F9
---------+----------+---------
G1 G2 G3 | G4 G5 G6 | G7 G8 G9
H1 H2 H3 | H4 H5 H6 | H7 H8 H9
I1 I2 I3 | I4 I5 I6 | I7 I8 I9
`;
      const printed = printSquares();
      expect(printed.trim()).toBe(expected.trim());
    });
  });
});
