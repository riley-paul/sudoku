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
            className={cn("text-sm font-light text-gray-500", {
              "border-b border-gray-400": s.row === "C" || s.row == "F",
              "border-r border-gray-400": s.col === "3" || s.col === "6",
              "text-sky-700": !s.given,
              "text-destructive": s.value !== s.solution,
            })}
          >
            <div
              className={cn("flex size-7 items-center justify-center", {
                "border-b border-b-gray-200":
                  s.row !== "C" && s.row !== "F" && s.row !== "I",
                "border-r border-r-gray-200":
                  s.col !== "3" && s.col !== "6" && s.col !== "9",
              })}
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
