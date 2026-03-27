import { describe, it, expect } from "vitest";
import { UNITS, ALL_UNITS, PEERS } from "./const";
import type { Square } from "./types";

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

  describe("PEERS", () => {
    it("should identify peers correctly", () => {
      expect(PEERS["C2"]).toBeDefined();
      expect(PEERS["C2"].size).toBe(20);

      const peers: Square[] = [
        "A1",
        "A2",
        "A3",
        "B1",
        "B2",
        "B3",
        "C1",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "D2",
        "E2",
        "F2",
        "G2",
        "H2",
        "I2",
      ];

      peers.forEach((peer) => expect(PEERS["C2"].has(peer)).toBe(true));
    });
  });
});
