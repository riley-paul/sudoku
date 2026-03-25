import { describe, it, expect, beforeEach } from "vitest";
import useStore from "./store";
import { initBoard } from "./init";

beforeEach(() => {
  useStore.setState({ cells: {}, selectedCellId: null });
});

describe("store", () => {
  describe("setCells", () => {
    it("should replace the cells in the store", () => {
      const board = initBoard();
      useStore.getState().setCells(board);
      expect(useStore.getState().cells).toEqual(board);
    });

    it("should overwrite previously set cells", () => {
      useStore.getState().setCells(initBoard());
      const secondBoard = initBoard();
      secondBoard["r0c0"].value = 7;
      useStore.getState().setCells(secondBoard);
      expect(useStore.getState().cells["r0c0"].value).toBe(7);
    });
  });

  describe("selectCell", () => {
    it("should set selectedCellId", () => {
      useStore.getState().selectCell("r0c0");
      expect(useStore.getState().selectedCellId).toBe("r0c0");
    });

    it("should update selectedCellId when selecting a different cell", () => {
      useStore.getState().selectCell("r0c0");
      useStore.getState().selectCell("r4c4");
      expect(useStore.getState().selectedCellId).toBe("r4c4");
    });
  });

  describe("setValue", () => {
    beforeEach(() => {
      useStore.setState({ cells: initBoard() });
    });

    it("should set the value of a cell", () => {
      useStore.getState().setValue("r0c0", 5);
      expect(useStore.getState().cells["r0c0"].value).toBe(5);
    });

    it("should set the value to null", () => {
      useStore.setState((state) => ({
        cells: { ...state.cells, r0c0: { ...state.cells["r0c0"], value: 5 } },
      }));
      useStore.getState().setValue("r0c0", null);
      expect(useStore.getState().cells["r0c0"].value).toBeNull();
    });

    it("should clear notes when a value is set", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r0c0: { ...state.cells["r0c0"], notes: new Set([1, 2, 3]) },
        },
      }));
      useStore.getState().setValue("r0c0", 5);
      expect(useStore.getState().cells["r0c0"].notes.size).toBe(0);
    });

    it("should not change a given cell's value", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r0c0: { ...state.cells["r0c0"], value: 3, given: true },
        },
      }));
      useStore.getState().setValue("r0c0", 7);
      expect(useStore.getState().cells["r0c0"].value).toBe(3);
    });

    it("should not affect other cells", () => {
      useStore.getState().setValue("r0c0", 5);
      expect(useStore.getState().cells["r0c1"].value).toBeNull();
    });
  });

  describe("toggleNote", () => {
    beforeEach(() => {
      useStore.setState({ cells: initBoard() });
    });

    it("should add a note that does not yet exist", () => {
      useStore.getState().toggleNote("r1c1", 3);
      expect(useStore.getState().cells["r1c1"].notes.has(3)).toBe(true);
    });

    it("should remove a note that already exists", () => {
      useStore.getState().toggleNote("r1c1", 3);
      useStore.getState().toggleNote("r1c1", 3);
      expect(useStore.getState().cells["r1c1"].notes.has(3)).toBe(false);
    });

    it("should support multiple distinct notes on the same cell", () => {
      useStore.getState().toggleNote("r1c1", 3);
      useStore.getState().toggleNote("r1c1", 7);
      expect(useStore.getState().cells["r1c1"].notes.has(3)).toBe(true);
      expect(useStore.getState().cells["r1c1"].notes.has(7)).toBe(true);
    });

    it("should only remove the toggled note and leave others intact", () => {
      useStore.getState().toggleNote("r1c1", 3);
      useStore.getState().toggleNote("r1c1", 7);
      useStore.getState().toggleNote("r1c1", 3);
      expect(useStore.getState().cells["r1c1"].notes.has(3)).toBe(false);
      expect(useStore.getState().cells["r1c1"].notes.has(7)).toBe(true);
    });

    it("should not add notes to a given cell", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r0c0: { ...state.cells["r0c0"], given: true },
        },
      }));
      useStore.getState().toggleNote("r0c0", 5);
      expect(useStore.getState().cells["r0c0"].notes.size).toBe(0);
    });

    it("should not affect other cells", () => {
      useStore.getState().toggleNote("r1c1", 3);
      expect(useStore.getState().cells["r1c2"].notes.size).toBe(0);
    });
  });

  describe("clearCell", () => {
    beforeEach(() => {
      useStore.setState({ cells: initBoard() });
    });

    it("should clear the value of a cell", () => {
      useStore.setState((state) => ({
        cells: { ...state.cells, r3c3: { ...state.cells["r3c3"], value: 9 } },
      }));
      useStore.getState().clearCell("r3c3");
      expect(useStore.getState().cells["r3c3"].value).toBeNull();
    });

    it("should clear the notes of a cell", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r3c3: { ...state.cells["r3c3"], notes: new Set([1, 5, 9]) },
        },
      }));
      useStore.getState().clearCell("r3c3");
      expect(useStore.getState().cells["r3c3"].notes.size).toBe(0);
    });

    it("should clear both value and notes at the same time", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r3c3: {
            ...state.cells["r3c3"],
            value: 4,
            notes: new Set([2, 6]),
          },
        },
      }));
      useStore.getState().clearCell("r3c3");
      const cell = useStore.getState().cells["r3c3"];
      expect(cell.value).toBeNull();
      expect(cell.notes.size).toBe(0);
    });

    it("should not change a given cell", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r3c3: { ...state.cells["r3c3"], value: 6, given: true },
        },
      }));
      useStore.getState().clearCell("r3c3");
      expect(useStore.getState().cells["r3c3"].value).toBe(6);
    });

    it("should not affect other cells", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r3c3: { ...state.cells["r3c3"], value: 9 },
          r3c4: { ...state.cells["r3c4"], value: 4 },
        },
      }));
      useStore.getState().clearCell("r3c3");
      expect(useStore.getState().cells["r3c4"].value).toBe(4);
    });
  });
});
