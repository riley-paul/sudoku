import { current, enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Squares } from "./types";
import { gridToSquares, squaresToGrid } from "./transform";
import type { Digit, Square } from "@/sudoku/types";
import { COLS, EMPTY_PUZZLE_STRING, PEERS, ROWS } from "@/sudoku/const";
import { getSquare } from "@/sudoku/utils";
import { parseGrid, stringifyGrid } from "@/sudoku/parse";
import { isInvalidMove } from "./helpers";

enableMapSet();

const customStorage = createJSONStorage(() => localStorage, {
  reviver: (key, value) => {
    switch (key) {
      case "squares":
        return gridToSquares(parseGrid(value as string));
      case "history":
        return (value as string[]).map((gridStr) =>
          gridToSquares(parseGrid(gridStr)),
        );
      default:
        return value;
    }
  },
  replacer: (key, value) => {
    switch (key) {
      case "squares":
        return stringifyGrid(squaresToGrid(value as Squares));
      case "history":
        return (value as Squares[]).map((squares) =>
          stringifyGrid(squaresToGrid(squares)),
        );
      default:
        return value;
    }
  },
});

type State = {
  squares: Squares;
  selectedSquare: Square;
  history: Squares[];
  entryMode: "value" | "note";
  strikes: number;
};

const initialState: State = {
  squares: gridToSquares(parseGrid(EMPTY_PUZZLE_STRING)),
  selectedSquare: "E5",
  history: [],
  entryMode: "value",
  strikes: 0,
};

type Actions = {
  setSquareValue: (id: Square, value: Digit) => void;
  toggleSquareNote: (id: Square, value: Digit) => void;
  clearSquare: (id: Square) => void;

  selectSquare: (id: Square) => void;
  moveSelection: (direction: "up" | "down" | "left" | "right") => void;

  toggleEntryMode: () => void;

  addHistory: () => void;
  undo: () => void;

  newGame: () => Promise<void>;
};

const useStore = create<State & Actions>()(
  persist(
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
          if (!cell || cell.given) return state; // don't allow changes to given cells

          // add strike if invalid move
          if (isInvalidMove(state.squares, id, value)) {
            state.strikes += 1;
          }

          state.history.push(current(state.squares));
          state.squares[id] = {
            ...cell,
            given: false,
            value,
            notes: new Set(), // clear notes when a value is set
          };

          // clear from notes of peers
          PEERS[id].forEach((peerId) => {
            state.squares[peerId].notes.delete(value);
          });
        }),

      toggleSquareNote: (id, value) =>
        set((state) => {
          const cell = state.squares[id];
          if (!cell || cell.given) return state; // don't allow changes to given cells

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

      clearSquare: (id) =>
        set((state) => {
          const cell = state.squares[id];
          if (!cell || cell.given) return state; // Don't allow changes to given cells

          state.history.push(current(state.squares));
          state.squares[id] = {
            ...cell,
            value: null,
            notes: new Set(),
          };
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

      newGame: async () => {
        const response = await fetch("/api/random-puzzle");
        const puzzleString = await response.text();

        set((state) => ({
          ...state,
          ...initialState,
          squares: gridToSquares(parseGrid(puzzleString)),
        }));
      },
    })),
    {
      name: "sudoku-storage",
      storage: customStorage,
      partialize: (state) => ({
        squares: state.squares,
        history: state.history,
        strikes: state.strikes,
      }),
    },
  ),
);

export default useStore;
