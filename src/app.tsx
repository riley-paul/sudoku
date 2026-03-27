import React, { useEffect } from "react";
import EntryModeToggle from "./components/controls/entry-mode-toggle";
import Board from "./components/board";
import UndoButton from "./components/controls/undo-button";
import type { Squares } from "./lib/types";
import useStore from "./lib/store";
import { SQUARES } from "./sudoku/const";
import type { Square } from "./sudoku/types";
import { printGrid } from "./sudoku/parse";
import Options from "./components/options";

type Props = { squares: Squares };

const App: React.FC<Props> = ({ squares }) => {
  useEffect(() => {
    const grid = SQUARES.reduce(
      (acc, val) => {
        acc[val] = squares[val].value?.toString() || "";
        return acc;
      },
      {} as Record<Square, string>,
    );

    console.log("Setting squares from server");
    console.log(printGrid(grid));

    useStore.setState({ squares });
  }, [squares]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-extrabold tracking-tight">Sudoku</h1>
      <Board />
      <footer className="flex items-center justify-between gap-2">
        <EntryModeToggle />
        <UndoButton />
      </footer>
      <Options />
    </div>
  );
};

export default App;
