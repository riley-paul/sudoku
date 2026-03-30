import React from "react";

import useStore from "@/lib/store";
import { ALLOWED_STRIKES } from "@/lib/const";

import UndoButton from "@/components/controls/undo-button";
import ClearButton from "@/components/controls/clear-button";
import NewGameButton from "@/components/controls/new-game-button";
import EntryModeToggle from "@/components/controls/entry-mode-toggle";

import Board from "@/components/board";
import Options from "@/components/options";
import AutoNoteButton from "../controls/auto-note-button";

const Game: React.FC = () => {
  const strikes = useStore((s) => s.strikes);
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
        <section className="flex items-center gap-1">
          <ClearButton />
          <UndoButton />
          <NewGameButton />
          <AutoNoteButton />
        </section>
      </footer>
      <Options />
    </div>
  );
};

export default Game;
