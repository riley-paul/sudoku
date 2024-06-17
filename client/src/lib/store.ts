import { create } from "zustand";

interface State {
  grid: number[][];
}

const DEFAULT_STATE: State = {
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
  reset: () => void;
}

const useStore = create<State & Actions>()((set) => ({
  ...DEFAULT_STATE,
  setGrid: (grid) => set({ grid }),
  setCell: ({ row, col, value }) =>
    set((state) => {
      const grid = [...state.grid];
      grid[row][col] = value;
      return { grid };
    }),
  reset: () => set(DEFAULT_STATE),
}));

export default useStore;
