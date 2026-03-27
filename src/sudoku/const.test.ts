import { describe, it, expect } from "vitest";
import { UNITS, ALL_UNITS } from "./const";

describe("const", () => {
  describe("ALL_UNITS", () => {
    it("should contain 27 units", () => {
      expect(ALL_UNITS).toBeDefined();
      expect(Object.values(ALL_UNITS).length).toBe(27);
    });
  });

  describe("UNITS", () => {
    it("should contain 81 squares", () => {
      expect(Object.values(UNITS).length).toBe(81);
    });

    it("should identify units correctly", () => {
      expect(UNITS["A1"]).toBeDefined();
      expect(UNITS["A1"].length).toBe(3);
      expect(UNITS["A1"][0]).toEqual([
        "A1",
        "A2",
        "A3",
        "B1",
        "B2",
        "B3",
        "C1",
        "C2",
        "C3",
      ]);
      expect(UNITS["A1"][1]).toEqual([
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
      ]);
      expect(UNITS["A1"][2]).toEqual([
        "A1",
        "B1",
        "C1",
        "D1",
        "E1",
        "F1",
        "G1",
        "H1",
        "I1",
      ]);
    });
  });
});
