import { current, enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Squares } from "./types";
import { initSquares } from "./init";
import type { Digit, Square } from "@/sudoku/types";
import { COLS, ROWS } from "@/sudoku/const";
import { getSquare } from "@/sudoku/utils";

enableMapSet();

type State = {
  squares: Squares;
  selectedSquare: Square;
  history: Squares[];
  entryMode: "value" | "note";
};

const initialState: State = {
  squares: initSquares(),
  selectedSquare: "E5",
  history: [],
  entryMode: "value",
};

type Actions = {
  setSquareValue: (id: Square, value: Digit | null) => void;
  toggleSquareNote: (id: Square, value: Digit) => void;

  selectSquare: (id: Square) => void;
  moveSelection: (direction: "up" | "down" | "left" | "right") => void;

  toggleEntryMode: () => void;

  addHistory: () => void;
  undo: () => void;
};

const useStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    addHistory: () =>
      set((state) => {
        state.history.push(current(state.squares));
      }),

    undo: () =>
      set((state) => {
        if (state.history.length === 0) return;

        const previousCells = state.history.pop();
        state.squares = previousCells!;
      }),

    setSquareValue: (id, value) =>
      set((state) => {
        const cell = state.squares[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        // clear from notes of peers

        state.history.push(current(state.squares));
        state.squares[id] = {
          ...cell,
          given: false,
          value,
          notes: new Set(), // Clear notes when a value is set
        };
      }),

    toggleSquareNote: (id, value) =>
      set((state) => {
        const cell = state.squares[id];
        if (!cell || cell.given) return state; // Don't allow changes to given cells

        const newNotes = new Set(cell.notes);
        if (newNotes.has(value)) {
          newNotes.delete(value);
        } else {
          newNotes.add(value);
        }

        state.history.push(current(state.squares));
        state.squares[id] = { ...cell, notes: newNotes };
      }),

    toggleEntryMode: () =>
      set((state) => {
        state.entryMode = state.entryMode === "value" ? "note" : "value";
      }),

    selectSquare: (id) =>
      set((state) => {
        state.selectedSquare = id;
      }),

    moveSelection: (direction) =>
      set((state) => {
        if (!state.selectedSquare) return state;

        const currentCell = state.squares[state.selectedSquare];
        if (!currentCell) return state;

        let newRowIdx = ROWS.indexOf(currentCell.row);
        let newColIdx = COLS.indexOf(currentCell.col);

        switch (direction) {
          case "up":
            newRowIdx -= 1;
            break;
          case "down":
            newRowIdx += 1;
            break;
          case "left":
            newColIdx -= 1;
            break;
          case "right":
            newColIdx += 1;
            break;
        }

        newRowIdx = Math.max(0, Math.min(ROWS.length - 1, newRowIdx));
        newColIdx = Math.max(0, Math.min(COLS.length - 1, newColIdx));

        const newRow = ROWS[newRowIdx];
        const newCol = COLS[newColIdx];
        if (!newRow || !newCol) return state;

        state.selectedSquare = getSquare(newRow, newCol);
      }),
  })),
);

export default useStore;
