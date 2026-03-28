import React from "react";
import { Button } from "./ui/button";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { COLS, SQUARES } from "@/sudoku/const";
import type { Digit } from "@/sudoku/types";
import { useKeyHold } from "@tanstack/react-hotkeys";

const Option: React.FC<{ val: Digit }> = ({ val }) => {
  const s = useStore();

  const remainingValues = useStore(
    (s) =>
      COLS.length -
      SQUARES.filter((square) => s.squares[square].value === val).length,
  );

  const valueInNotes = useStore((s) =>
    s.squares[s.selectedSquare].notes.has(val),
  );

  const holdingShift = useKeyHold("Shift");

  const isValueMode = s.entryMode === "value" && !holdingShift;
  const isNoteMode = s.entryMode === "note" || holdingShift;

  const handleClick = () => {
    if (isNoteMode) {
      s.toggleSquareNote(s.selectedSquare, val);
      return;
    }
    if (isValueMode) {
      s.setSquareValue(s.selectedSquare, val);
      return;
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn("flex h-auto flex-col gap-0.5 px-0 py-0.5 md:py-1", {
        "opacity-0!": remainingValues <= 0,
        "bg-accent/70 hover:bg-accent/50": isNoteMode,
      })}
      disabled={remainingValues <= 0}
      onClick={handleClick}
    >
      <div
        className={cn("text-primary text-lg font-light md:text-2xl", {
          "text-muted-foreground": isNoteMode && valueInNotes,
        })}
      >
        {val}
      </div>
      <div className="text-muted-foreground text-2xs font-light md:text-xs">
        {remainingValues}
      </div>
    </Button>
  );
};

const Options: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-9 gap-1">
      {COLS.map((val) => (
        <Option key={val} val={val} />
      ))}
    </div>
  );
};

export default Options;
