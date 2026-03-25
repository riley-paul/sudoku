import { create } from "zustand";
import { produce, enableMapSet } from "immer";
import type { Cell, Cells } from "./types";
import { initBoard } from "./init";
import { getId } from "./helpers";

enableMapSet();

type State = {
  cells: Cells;
  selectedCellId: string | null;
};

const initialState: State = {
  cells: initBoard(),
  selectedCellId: null,
};

type Actions = {
  setValue: (id: string, value: number | null) => void;
  toggleNote: (id: string, value: number) => void;
  selectCell: (id: string) => void;
  moveSelection: (direction: "up" | "down" | "left" | "right") => void;

  clearCell: (id: string) => void;

  setCells: (cells: Cells) => void;
};

const useStore = create<State & Actions>((set) => ({
  ...initialState,

  setValue: (id, value) =>
    set(
      produce((state) => {
        const cell = state.cells[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        state.cells[id] = {
          ...cell,
          value,
          notes: new Set(), // Clear notes when a value is set
        };
      }),
    ),

  toggleNote: (id, value) =>
    set(
      produce((state) => {
        const cell = state.cells[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        const newNotes = new Set(cell.notes);
        if (newNotes.has(value)) {
          newNotes.delete(value);
        } else {
          newNotes.add(value);
        }

        state.cells[id] = { ...cell, notes: newNotes };
      }),
    ),

  selectCell: (id) => set(() => ({ selectedCellId: id })),

  moveSelection: (direction) =>
    set(
      produce((state) => {
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
    ),

  clearCell: (id) =>
    set(
      produce((state) => {
        const cell = state.cells[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        state.cells[id] = { ...cell, value: null, notes: new Set() };
      }),
    ),

  setCells: (cells) => set(() => ({ cells })),
}));

export default useStore;
