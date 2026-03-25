import { create } from "zustand";
import { produce } from "immer";
import type { Cell } from "./types";

type State = {
  cells: Record<string, Cell>;
  selectedCellId: string | null;

  setValue: (id: string, value: number | null) => void;
  toggleNote: (id: string, value: number) => void;
  selectCell: (id: string) => void;

  clearCell: (id: string) => void;
};

const useStore = create<State>((set) => ({
  cells: {}, // This will be initialized with the puzzle data
  selectedCellId: null,

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

  clearCell: (id) =>
    set(
      produce((state) => {
        const cell = state.cells[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        state.cells[id] = { ...cell, value: null, notes: new Set() };
      }),
    ),
}));

export default useStore;
