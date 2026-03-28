import { describe, it, expect } from "vitest";
import { stringifySquares, parseSquares } from "./persist";
import type { Squares, SquareInfo } from "./types";
import type { Digit, Row, Square } from "@/sudoku/types";
import { COLS, ROWS } from "@/sudoku/const";

// ── Helpers ──────────────────────────────────────────────────────────────────

const makeSquareInfo = (
  id: Square,
  overrides: Partial<SquareInfo> = {},
): SquareInfo => ({
  id,
  row: id[0] as Row,
  col: id[1] as Digit,
  value: null,
  given: false,
  notes: new Set(),
  ...overrides,
});

const makeSquares = (
  overrides: Partial<Record<Square, Partial<SquareInfo>>> = {},
): Squares => {
  const squares = {} as Squares;
  for (const row of ROWS) {
    for (const col of COLS) {
      const id = `${row}${col}` as Square;
      squares[id] = makeSquareInfo(id, overrides[id]);
    }
  }
  return squares;
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("persist", () => {
  describe("stringifySquares", () => {
    it("produces a valid JSON string", () => {
      const squares = makeSquares();
      const result = stringifySquares(squares);

      expect(() => JSON.parse(result)).not.toThrow();
      expect(typeof result).toBe("string");
    });

    it("serializes notes Sets as arrays in the JSON output", () => {
      const squares = makeSquares({
        A1: { notes: new Set(["1", "3", "5"]) },
      });

      const json = JSON.parse(stringifySquares(squares));

      expect(Array.isArray(json.A1.notes)).toBe(true);
      expect(json.A1.notes).toEqual(expect.arrayContaining(["1", "3", "5"]));
      expect(json.A1.notes).toHaveLength(3);
    });

    it("serializes an empty notes Set as an empty array", () => {
      const squares = makeSquares({ B2: { notes: new Set() } });
      const json = JSON.parse(stringifySquares(squares));

      expect(Array.isArray(json.B2.notes)).toBe(true);
      expect(json.B2.notes).toHaveLength(0);
    });

    it("preserves all 81 squares", () => {
      const squares = makeSquares();
      const json = JSON.parse(stringifySquares(squares));

      expect(Object.keys(json)).toHaveLength(81);
    });
  });

  describe("parseSquares", () => {
    it("deserializes notes arrays back into Sets", () => {
      const raw = JSON.stringify({
        A1: {
          id: "A1",
          row: "A",
          col: "1",
          value: null,
          given: false,
          notes: ["2", "7"],
        },
      });

      const result = parseSquares(raw);

      expect(result.A1.notes).toBeInstanceOf(Set);
      expect(result.A1.notes).toEqual(new Set(["2", "7"]));
    });

    it("deserializes an empty notes array back into an empty Set", () => {
      const raw = JSON.stringify({
        C3: {
          id: "C3",
          row: "C",
          col: "3",
          value: null,
          given: false,
          notes: [],
        },
      });

      const result = parseSquares(raw);

      expect(result.C3.notes).toBeInstanceOf(Set);
      expect(result.C3.notes.size).toBe(0);
    });
  });

  describe("round-trip (stringifySquares → parseSquares)", () => {
    it("preserves an empty board without data loss", () => {
      const original = makeSquares();
      const restored = parseSquares(stringifySquares(original));

      expect(restored).toEqual(original);
    });

    it("preserves notes Sets with a single digit", () => {
      const original = makeSquares({ D5: { notes: new Set(["9"]) } });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.D5.notes).toBeInstanceOf(Set);
      expect(restored.D5.notes).toEqual(new Set(["9"]));
    });

    it("preserves notes Sets with multiple digits", () => {
      const original = makeSquares({
        E7: { notes: new Set(["1", "4", "6", "8"]) },
      });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.E7.notes).toBeInstanceOf(Set);
      expect(restored.E7.notes).toEqual(new Set(["1", "4", "6", "8"]));
    });

    it("preserves notes Sets containing all nine digits", () => {
      const allDigits = new Set<Digit>([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ]);
      const original = makeSquares({ I9: { notes: allDigits } });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.I9.notes).toBeInstanceOf(Set);
      expect(restored.I9.notes).toEqual(allDigits);
    });

    it("preserves a null cell value", () => {
      const original = makeSquares({ A1: { value: null } });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.A1.value).toBeNull();
    });

    it("preserves a filled cell value", () => {
      const original = makeSquares({ B3: { value: "7" } });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.B3.value).toBe("7");
    });

    it("preserves given: true for pre-filled cells", () => {
      const original = makeSquares({ C4: { value: "3", given: true } });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.C4.given).toBe(true);
      expect(restored.C4.value).toBe("3");
    });

    it("preserves given: false for empty cells", () => {
      const original = makeSquares({ F6: { given: false } });
      const restored = parseSquares(stringifySquares(original));

      expect(restored.F6.given).toBe(false);
    });

    it("preserves the square id, row, and col fields", () => {
      const original = makeSquares();
      const restored = parseSquares(stringifySquares(original));

      for (const row of ROWS) {
        for (const col of COLS) {
          const id = `${row}${col}` as Square;
          expect(restored[id].id).toBe(id);
          expect(restored[id].row).toBe(row);
          expect(restored[id].col).toBe(col);
        }
      }
    });

    it("preserves all 81 squares across the round-trip", () => {
      const original = makeSquares();
      const restored = parseSquares(stringifySquares(original));

      expect(Object.keys(restored)).toHaveLength(81);
    });

    it("preserves a realistic partially-filled board", () => {
      const original = makeSquares({
        A1: { value: "5", given: true, notes: new Set() },
        A2: { value: null, given: false, notes: new Set(["1", "3"]) },
        B5: { value: "9", given: true, notes: new Set() },
        C7: { value: null, given: false, notes: new Set(["2", "4", "6"]) },
        I9: { value: "1", given: false, notes: new Set() },
      });

      const restored = parseSquares(stringifySquares(original));

      expect(restored).toEqual(original);

      // Spot-check Set instances are real Sets
      expect(restored.A2.notes).toBeInstanceOf(Set);
      expect(restored.C7.notes).toBeInstanceOf(Set);
    });
  });
});
