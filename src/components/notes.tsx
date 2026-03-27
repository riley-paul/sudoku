import { cn } from "@/lib/utils";
import type { Digit } from "@/sudoku/types";
import React from "react";

type Props = { notes: Set<Digit> };

const Notes: React.FC<Props> = ({ notes }) => {
  return (
    <div className="grid h-full w-full grid-cols-3 p-0.5 text-[0.4rem] md:text-[0.55rem]">
      {Array.from({ length: 9 }, (_, i) => {
        const n = i + 1;
        const isToggled = notes.has(n);
        return (
          <div
            key={n}
            className={cn("flex items-center justify-center", {
              "opacity-0": !isToggled,
            })}
          >
            {isToggled ? n : "0"}
          </div>
        );
      })}
    </div>
  );
};

export default Notes;
