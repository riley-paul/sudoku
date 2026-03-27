import { describe, expect, it } from "vitest";
import { parsePuzzle, printPuzzle } from "./parse";

const input =
  "....7..2.8.......6.1.2.5...9.54....8.........3....85.1...3.2.8.4.......9.7..6....";

describe("parse", () => {
  describe("parsePuzzle", () => {
    it("should parse a sudoku string into a puzzle object", () => {
      const expected = {
        A1: null,
        A2: null,
        A3: null,
        A4: null,
        A5: "7",
        A6: null,
        A7: null,
        A8: "2",
        A9: null,
        B1: "8",
        B2: null,
        B3: null,
        B4: null,
        B5: null,
        B6: null,
        B7: null,
        B8: null,
        B9: "6",
        C1: null,
        C2: "1",
        C3: null,
        C4: "2",
        C5: null,
        C6: "5",
        C7: null,
        C8: null,
        C9: null,
        D1: "9",
        D2: null,
        D3: "5",
        D4: "4",
        D5: null,
        D6: null,
        D7: null,
        D8: null,
        D9: "8",
        E1: null,
        E2: null,
        E3: null,
        E4: null,
        E5: null,
        E6: null,
        E7: null,
        E8: null,
        E9: null,
        F1: "3",
        F2: null,
        F3: null,
        F4: null,
        F5: null,
        F6: "8",
        F7: "5",
        F8: null,
        F9: "1",
        G1: null,
        G2: null,
        G3: null,
        G4: "3",
        G5: null,
        G6: "2",
        G7: null,
        G8: "8",
        G9: null,
        H1: "4",
        H2: null,
        H3: null,
        H4: null,
        H5: null,
        H6: null,
        H7: null,
        H8: null,
        H9: "9",
        I1: null,
        I2: "7",
        I3: null,
        I4: null,
        I5: "6",
        I6: null,
        I7: null,
        I8: null,
        I9: null,
      };

      const result = parsePuzzle(input);
      expect(result).toEqual(expected);
    });

    it("should throw an error if the input string is not 81 characters long", () => {
      expect(() => parsePuzzle("short")).toThrow(
        "Invalid puzzle string: must be exactly 81 characters long",
      );
    });

    it("should throw an error if the input string contains invalid characters", () => {
      const testString =
        "....7..2.8....z..6.1.2.5...9.54....8.........3....85.1...3.2.8.4.......9.7..6....";
      expect(() => parsePuzzle(testString)).toThrow(
        "Invalid character at position 14: must be a digit 1-9 or a dot for empty squares",
      );
    });
  });

  describe("printPuzzle", () => {
    it("should print a puzzle in a human-readable format", () => {
      const puzzle = parsePuzzle(input);
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

    it("should print a puzzle with cell IDs when requested", () => {
      const puzzle = parsePuzzle(input);
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
      const printed = printPuzzle(puzzle, true);
      expect(printed.trim()).toBe(expected.trim());
    });
  });
});
