import React, { useEffect } from "react";
import EntryModeToggle from "./components/controls/entry-mode-toggle";
import Board from "./components/board";
import UndoButton from "./components/controls/undo-button";
import useStore from "./lib/store";
import { parseGrid, printGrid } from "./sudoku/parse";
import Options from "./components/options";
import { gridToSquares } from "./lib/transform";
import ClearButton from "./components/controls/clear-button";
import { ALLOWED_STRIKES } from "./lib/const";
import GameOver from "./components/game-over";

type Props = { puzzle: string };

const App: React.FC<Props> = ({ puzzle }) => {
  useEffect(() => {
    const grid = parseGrid(puzzle);
    const squares = gridToSquares(grid);

    console.log("Setting squares from server");
    console.log(printGrid(grid));

    useStore.setState({ squares });
  }, [puzzle]);

  const strikes = useStore((s) => s.strikes);

  if (strikes >= 3) return <GameOver />;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-extrabold tracking-tight">Sudoku</h1>
      <div className="flex flex-col gap-1">
        <header className="text-muted-foreground text-xs">
          <span>
            Mistakes: {strikes}/{ALLOWED_STRIKES}
          </span>
        </header>
        <Board />
      </div>
      <footer className="flex items-center justify-between gap-2">
        <EntryModeToggle />
        <section className="flex items-center gap-2">
          <ClearButton />
          <UndoButton />
        </section>
      </footer>
      <Options />
    </div>
  );
};

export default App;
