import { create } from "zustand";
import { produce, enableMapSet } from "immer";
import type { Cell } from "./types";
import { initBoard } from "./init";

enableMapSet();

type State = {
  cells: Record<string, Cell>;
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

  clearCell: (id: string) => void;

  setCells: (cells: Record<string, Cell>) => void;
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
