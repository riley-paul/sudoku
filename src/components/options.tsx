import React from "react";
import { Button } from "./ui/button";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { COLS, SQUARES } from "@/sudoku/const";
import type { Digit } from "@/sudoku/types";

const Option: React.FC<{ val: Digit }> = ({ val }) => {
  const s = useStore();

  const handleClick = () => {
    switch (s.entryMode) {
      case "value":
        s.setSquareValue(s.selectedSquare, val);
        break;
      case "note":
        s.toggleSquareNote(s.selectedSquare, val);
        break;
    }
  };

  const remaining = useStore(
    (s) =>
      COLS.length -
      SQUARES.filter((square) => s.squares[square].value === val).length,
  );

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn("flex h-14 flex-col p-0 md:h-16", {
        "opacity-0!": remaining <= 0,
      })}
      disabled={remaining <= 0}
      onClick={handleClick}
    >
      <div
        className={cn("text-primary text-lg font-light md:text-2xl", {
          // "text-muted-foreground": entryMode === "note",
          // "text-muted-foreground/50": entryMode === "note" && notesHasValue,
        })}
      >
        {val}
      </div>
      <div className="text-muted-foreground text-xs font-light">
        {remaining}
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
