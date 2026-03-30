import { isInvalidMove } from "@/lib/helpers";
import type { Squares } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SQUARES } from "@/sudoku/const";
import React from "react";

const DummyBoard: React.FC<{ squares: Squares }> = ({ squares }) => {
  return (
    <div className="grid grid-cols-[repeat(9,auto)] border-2 border-gray-600">
      {SQUARES.map((square) => {
        const s = squares[square];
        return (
          <div
            key={s.id}
            className={cn({
              "border-b border-gray-400": s.row === "C" || s.row == "F",
              "border-r border-gray-400": s.col === "3" || s.col === "6",
            })}
          >
            <div
              className={cn(
                "flex size-7 items-center justify-center text-sm text-gray-500",
                !s.given && "font-medium text-sky-800",
                s.value &&
                  isInvalidMove(squares, s.id, s.value) &&
                  "text-destructive",
              )}
            >
              {s.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DummyBoard;
