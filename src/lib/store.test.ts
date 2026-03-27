import { describe, it, expect, beforeEach } from "vitest";
import useStore from "./store";
import { initBoard } from "./init";

beforeEach(() => {
  useStore.setState({ cells: {}, selectedCellId: null });
});

describe.skip("store", () => {
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

  describe("setCellValue", () => {
    beforeEach(() => {
      useStore.setState({ cells: initBoard() });
    });

    it("should set the value of a cell", () => {
      useStore.getState().setCellValue("r0c0", 5);
      expect(useStore.getState().cells["r0c0"].value).toBe(5);
    });

    it("should set the value to null", () => {
      useStore.setState((state) => ({
        cells: { ...state.cells, r0c0: { ...state.cells["r0c0"], value: 5 } },
      }));
      useStore.getState().setCellValue("r0c0", null);
      expect(useStore.getState().cells["r0c0"].value).toBeNull();
    });

    it("should clear notes when a value is set", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r0c0: { ...state.cells["r0c0"], notes: new Set([1, 2, 3]) },
        },
      }));
      useStore.getState().setCellValue("r0c0", 5);
      expect(useStore.getState().cells["r0c0"].notes.length).toBe(0);
    });

    it("should not change a given cell's value", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r0c0: { ...state.cells["r0c0"], value: 3, given: true },
        },
      }));
      useStore.getState().setCellValue("r0c0", 7);
      expect(useStore.getState().cells["r0c0"].value).toBe(3);
    });

    it("should not affect other cells", () => {
      useStore.getState().setCellValue("r0c0", 5);
      expect(useStore.getState().cells["r0c1"].value).toBeNull();
    });
  });

  describe("toggleCellNote", () => {
    beforeEach(() => {
      useStore.setState({ cells: initBoard() });
    });

    it("should add a note that does not yet exist", () => {
      useStore.getState().toggleCellNote("r1c1", 3);
      expect(useStore.getState().cells["r1c1"].notes.includes(3)).toBe(true);
    });

    it("should remove a note that already exists", () => {
      useStore.getState().toggleCellNote("r1c1", 3);
      useStore.getState().toggleCellNote("r1c1", 3);
      expect(useStore.getState().cells["r1c1"].notes.includes(3)).toBe(false);
    });

    it("should support multiple distinct notes on the same cell", () => {
      useStore.getState().toggleCellNote("r1c1", 3);
      useStore.getState().toggleCellNote("r1c1", 7);
      expect(useStore.getState().cells["r1c1"].notes.includes(3)).toBe(true);
      expect(useStore.getState().cells["r1c1"].notes.includes(7)).toBe(true);
    });

    it("should only remove the toggled note and leave others intact", () => {
      useStore.getState().toggleCellNote("r1c1", 3);
      useStore.getState().toggleCellNote("r1c1", 7);
      useStore.getState().toggleCellNote("r1c1", 3);
      expect(useStore.getState().cells["r1c1"].notes.includes(3)).toBe(false);
      expect(useStore.getState().cells["r1c1"].notes.includes(7)).toBe(true);
    });

    it("should not add notes to a given cell", () => {
      useStore.setState((state) => ({
        cells: {
          ...state.cells,
          r0c0: { ...state.cells["r0c0"], given: true },
        },
      }));
      useStore.getState().toggleCellNote("r0c0", 5);
      expect(useStore.getState().cells["r0c0"].notes.length).toBe(0);
    });

    it("should not affect other cells", () => {
      useStore.getState().toggleCellNote("r1c1", 3);
      expect(useStore.getState().cells["r1c2"].notes.length).toBe(0);
    });
  });
});
