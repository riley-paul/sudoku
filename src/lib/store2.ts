import { enableMapSet } from "immer";
import { getDefaultStore } from "jotai";

enableMapSet();
import { atomWithReducer } from "jotai/utils";
import type { Cells } from "./types";
import { initBoard } from "./init";
import { produce } from "immer";

export const store = getDefaultStore();

type CellsActions =
  | {
      type: "SET_VALUE";
      payload: {
        id: string;
        value: number | null;
      };
    }
  | {
      type: "TOGGLE_NOTE";
      payload: {
        id: string;
        value: number;
      };
    };

export const cellsReducer = (state: Cells, action: CellsActions): Cells => {
  switch (action.type) {
    case "SET_VALUE": {
      const { id, value } = action.payload;
      return produce(state, (s) => {
        const cell = s[id];
        if (!cell || cell.given) return; // Don't allow changes to given cells

        cell.value = value;
        cell.notes = new Set(); // Clear notes when setting a value
      });
    }

    case "TOGGLE_NOTE": {
      const { id, value } = action.payload;
      return produce(state, (s) => {
        const cell = s[id];
        if (!cell || cell.given) return; // Don't allow changes to given cells

        if (cell.notes.has(value)) {
          cell.notes.delete(value);
        } else {
          cell.notes.add(value);
        }
      });
    }

    default:
      return state;
  }
};

export const cellsAtom = atomWithReducer<Cells, CellsActions>(
  initBoard(),
  cellsReducer,
);
