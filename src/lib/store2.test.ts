import { describe, it, expect } from "vitest";
import { cellsReducer } from "./store2";
import type { Cell, Cells } from "./types";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function makeCell(overrides: Partial<Cell> & { id: string }): Cell {
  const { id } = overrides;
  const rowMatch = id.match(/r(\d+)c(\d+)/);
  const row = rowMatch ? Number(rowMatch[1]) : 0;
  const col = rowMatch ? Number(rowMatch[2]) : 0;
  const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);

  return {
    row,
    col,
    box,
    value: null,
    given: false,
    notes: new Set(),
    ...overrides,
  };
}

function makeState(...cells: Cell[]): Cells {
  return Object.fromEntries(cells.map((c) => [c.id, c]));
}

// ---------------------------------------------------------------------------
// SET_VALUE
// ---------------------------------------------------------------------------

describe("cellsReducer / SET_VALUE", () => {
  it("sets the value of a non-given cell", () => {
    const state = makeState(makeCell({ id: "r0c0" }));
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: 5 },
    });
    expect(next["r0c0"].value).toBe(5);
  });

  it("sets the value to null", () => {
    const state = makeState(makeCell({ id: "r0c0", value: 7 }));
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: null },
    });
    expect(next["r0c0"].value).toBeNull();
  });

  it("clears all notes when a value is set", () => {
    const state = makeState(
      makeCell({ id: "r0c0", notes: new Set([1, 2, 3]) }),
    );
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: 4 },
    });
    expect(next["r0c0"].notes.size).toBe(0);
  });

  it("clears notes even when setting value to null", () => {
    const state = makeState(
      makeCell({ id: "r0c0", value: 3, notes: new Set([5, 6]) }),
    );
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: null },
    });
    expect(next["r0c0"].notes.size).toBe(0);
  });

  it("does not change the value of a given cell", () => {
    const state = makeState(makeCell({ id: "r0c0", value: 3, given: true }));
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: 9 },
    });
    expect(next["r0c0"].value).toBe(3);
  });

  it("does not clear notes on a given cell", () => {
    const state = makeState(
      makeCell({ id: "r0c0", given: true, notes: new Set([1, 2]) }),
    );
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: 7 },
    });
    expect(next["r0c0"].notes.size).toBe(2);
  });

  it("returns state unchanged when the cell id does not exist", () => {
    const state = makeState(makeCell({ id: "r0c0" }));
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r9c9", value: 5 },
    });
    expect(next).toEqual(state);
  });

  it("does not affect other cells", () => {
    const state = makeState(
      makeCell({ id: "r0c0" }),
      makeCell({ id: "r0c1", value: 4 }),
    );
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: 8 },
    });
    expect(next["r0c1"].value).toBe(4);
  });

  it("returns a new state object (immutability)", () => {
    const state = makeState(makeCell({ id: "r0c0" }));
    const next = cellsReducer(state, {
      type: "SET_VALUE",
      payload: { id: "r0c0", value: 1 },
    });
    expect(next).not.toBe(state);
    expect(next["r0c0"]).not.toBe(state["r0c0"]);
  });
});

// ---------------------------------------------------------------------------
// TOGGLE_NOTE
// ---------------------------------------------------------------------------

describe("cellsReducer / TOGGLE_NOTE", () => {
  it("adds a note that does not yet exist", () => {
    const state = makeState(makeCell({ id: "r1c1" }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 3 },
    });
    expect(next["r1c1"].notes.has(3)).toBe(true);
  });

  it("removes a note that already exists", () => {
    const state = makeState(makeCell({ id: "r1c1", notes: new Set([3]) }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 3 },
    });
    expect(next["r1c1"].notes.has(3)).toBe(false);
  });

  it("toggling a note twice restores the original state", () => {
    const state = makeState(makeCell({ id: "r1c1" }));
    const after1 = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 5 },
    });
    const after2 = cellsReducer(after1, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 5 },
    });
    expect(after2["r1c1"].notes.has(5)).toBe(false);
    expect(after2["r1c1"].notes.size).toBe(0);
  });

  it("supports multiple distinct notes on the same cell", () => {
    const state = makeState(makeCell({ id: "r1c1" }));
    const after1 = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 3 },
    });
    const after2 = cellsReducer(after1, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 7 },
    });
    expect(after2["r1c1"].notes.has(3)).toBe(true);
    expect(after2["r1c1"].notes.has(7)).toBe(true);
    expect(after2["r1c1"].notes.size).toBe(2);
  });

  it("removes only the toggled note and leaves others intact", () => {
    const state = makeState(makeCell({ id: "r1c1", notes: new Set([3, 7]) }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 3 },
    });
    expect(next["r1c1"].notes.has(3)).toBe(false);
    expect(next["r1c1"].notes.has(7)).toBe(true);
  });

  it("does not add notes to a given cell", () => {
    const state = makeState(makeCell({ id: "r0c0", given: true }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r0c0", value: 5 },
    });
    expect(next["r0c0"].notes.size).toBe(0);
  });

  it("does not remove existing notes from a given cell", () => {
    const state = makeState(
      makeCell({ id: "r0c0", given: true, notes: new Set([2, 4]) }),
    );
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r0c0", value: 2 },
    });
    // given guard fires before any mutation, so notes remain unchanged
    expect(next["r0c0"].notes.has(2)).toBe(true);
    expect(next["r0c0"].notes.size).toBe(2);
  });

  it("returns state unchanged when the cell id does not exist", () => {
    const state = makeState(makeCell({ id: "r0c0" }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r9c9", value: 1 },
    });
    expect(next).toEqual(state);
  });

  it("does not affect other cells", () => {
    const state = makeState(makeCell({ id: "r1c1" }), makeCell({ id: "r1c2" }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 3 },
    });
    expect(next["r1c2"].notes.size).toBe(0);
  });

  it("returns a new state object (immutability)", () => {
    const state = makeState(makeCell({ id: "r1c1" }));
    const next = cellsReducer(state, {
      type: "TOGGLE_NOTE",
      payload: { id: "r1c1", value: 4 },
    });
    expect(next).not.toBe(state);
    expect(next["r1c1"]).not.toBe(state["r1c1"]);
  });
});

// ---------------------------------------------------------------------------
// Default / unknown action
// ---------------------------------------------------------------------------

describe("cellsReducer / default", () => {
  it("returns the same state reference for an unknown action type", () => {
    const state = makeState(makeCell({ id: "r0c0", value: 2 }));
    // Cast to `any` to simulate an unrecognised action arriving at runtime
    const next = cellsReducer(state, { type: "UNKNOWN" } as any);
    expect(next).toBe(state);
  });
});
