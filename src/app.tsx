import React, { useEffect } from "react";
import EntryModeToggle from "./components/controls/entry-mode-toggle";
import Board from "./components/board";
import UndoButton from "./components/controls/undo-button";
import useStore from "./lib/store";
import { parseGrid, printGrid } from "./sudoku/parse";
import Options from "./components/options";
import { gridToSquares } from "./lib/transform";

type Props = { puzzle: string };

const App: React.FC<Props> = ({ puzzle }) => {
  useEffect(() => {
    const grid = parseGrid(puzzle);
    const squares = gridToSquares(grid);

    console.log("Setting squares from server");
    console.log(printGrid(grid));

    useStore.setState({ squares });
  }, [puzzle]);

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
