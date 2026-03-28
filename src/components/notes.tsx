import { cn } from "@/lib/utils";
import { COLS } from "@/sudoku/const";
import type { Digit } from "@/sudoku/types";
import React from "react";

type Props = { notes: Set<Digit> };

const Notes: React.FC<Props> = ({ notes }) => {
  return (
    <div className="text-[6px] md:text-[9px] font-normal grid h-full w-full grid-cols-3 p-0.5">
      {COLS.map((col) => {
        const isToggled = notes.has(col);
        return (
          <div
            key={col}
            className={cn("flex items-center justify-center", {
              "opacity-0": !isToggled,
            })}
          >
            {isToggled ? col : "0"}
          </div>
        );
      })}
    </div>
  );
};

export default Notes;
