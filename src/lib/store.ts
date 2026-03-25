import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Cells } from "./types";
import { initBoard } from "./init";
import { getId } from "./helpers";

type State = {
  cells: Cells;
  selectedCellId: string | null;
  history: Cells[];
  entryMode: "value" | "note";
};

const initialState: State = {
  cells: initBoard(),
  selectedCellId: null,
  history: [],
  entryMode: "value",
};

type Actions = {
  setCellValue: (id: string, value: number | null) => void;

  toggleCellNote: (id: string, value: number) => void;

  selectCell: (id: string) => void;
  moveSelection: (direction: "up" | "down" | "left" | "right") => void;

  toggleEntryMode: () => void;

  undo: () => void;
};

const useStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    undo: () =>
      set((state) => {
        console.log(state.history);

        if (state.history.length === 0) return state;

        const previousCells = state.history[state.history.length - 1];
        state.history = state.history.slice(0, -1);
        state.cells = previousCells;
      }),

    setCellValue: (id, value) =>
      set((state) => {
        const cell = state.cells[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        state.history.push(state.cells);
        state.cells[id] = {
          ...cell,
          given: false,
          value,
          notes: [], // Clear notes when a value is set
        };
      }),

    toggleCellNote: (id, value) =>
      set((state) => {
        const cell = state.cells[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        const newNotes = new Set(cell.notes);
        if (newNotes.has(value)) {
          newNotes.delete(value);
        } else {
          newNotes.add(value);
        }

        state.history.push(state.cells);
        state.cells[id] = { ...cell, notes: Array.from(newNotes) };
      }),

    toggleEntryMode: () =>
      set((state) => {
        state.entryMode = state.entryMode === "value" ? "note" : "value";
      }),

    selectCell: (id) => set(() => ({ selectedCellId: id })),

    moveSelection: (direction) =>
      set((state) => {
        if (!state.selectedCellId) return state;

        const currentCell = state.cells[state.selectedCellId];
        if (!currentCell) return state;

        let newRow = currentCell.row;
        let newCol = currentCell.col;

        switch (direction) {
          case "up":
            newRow = Math.max(0, currentCell.row - 1);
            break;
          case "down":
            newRow = Math.min(8, currentCell.row + 1);
            break;
          case "left":
            newCol = Math.max(0, currentCell.col - 1);
            break;
          case "right":
            newCol = Math.min(8, currentCell.col + 1);
            break;
        }

        const newId = getId(newRow, newCol);
        if (state.cells[newId]) {
          state.selectedCellId = newId;
        }
      }),
  })),
);

export default useStore;
