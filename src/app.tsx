import React, { useEffect } from "react";
import EntryModeToggle from "./components/controls/entry-mode-toggle";
import Board from "./components/board";
import Options from "./components/options";
import UndoButton from "./components/controls/undo-button";
import type { Cells } from "./lib/types";
import useStore from "./lib/store";

type Props = {
  cells: Cells;
};

const App: React.FC<Props> = ({ cells }) => {
  useEffect(() => {
    useStore.setState({ cells });
  }, [cells]);

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
