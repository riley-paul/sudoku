import { create } from "zustand";
import { ZERO_TO_EIGHT } from "./constants.ts";

interface State {
  grid: number[][];
  selected: { row: number; col: number } | null;
}

const DEFAULT_STATE: State = {
  selected: null,
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

interface Actions {
  setGrid: (grid: number[][]) => void;
  setCell: (props: { row: number; col: number; value: number }) => void;
  setSelected: (selected: { row: number; col: number } | null) => void;
  getRemaining: () => number[];
  reset: () => void;
}

const useStore = create<State & Actions>()((set, get) => ({
  ...DEFAULT_STATE,
  setGrid: (grid) => set({ grid }),
  setCell: ({ row, col, value }) =>
    set((state) => {
      const grid = [...state.grid];
      grid[row][col] = value;
      return { grid };
    }),
  getRemaining: () => {
    const grid = get().grid;
    const result = ZERO_TO_EIGHT.map(() => 9);
    grid.flat().forEach((cell) => {
      if (cell > 0) {
        result[cell - 1]--;
      }
    });
    return result;
  },
  setSelected: (selected) => set({ selected }),
  reset: () => set(DEFAULT_STATE),
}));

export default useStore;
