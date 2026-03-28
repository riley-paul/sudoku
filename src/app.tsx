import React, { useEffect } from "react";
import EntryModeToggle from "./components/controls/entry-mode-toggle";
import Board from "./components/board";
import UndoButton from "./components/controls/undo-button";
import useStore from "./lib/store";
import Options from "./components/options";
import ClearButton from "./components/controls/clear-button";
import { ALLOWED_STRIKES } from "./lib/const";
import GameOver from "./components/screens/game-over";
import NewGameButton from "./components/controls/new-game-button";
import { TooltipProvider } from "./components/ui/tooltip";
import { isPuzzleComplete } from "./lib/helpers";
import GameWon from "./components/screens/game-won";

const App: React.FC = () => {
  const newGame = useStore((s) => s.newGame);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const strikes = useStore((s) => s.strikes);
  const hasWon = useStore((s) => isPuzzleComplete(s.squares));

  if (hasWon) return <GameWon />;
  if (strikes >= 3) return <GameOver />;

  return (
    <TooltipProvider delayDuration={1_000}>
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
          <section className="flex items-center gap-1">
            <ClearButton />
            <UndoButton />
            <NewGameButton />
          </section>
        </footer>
        <Options />
      </div>
    </TooltipProvider>
  );
};

export default App;
