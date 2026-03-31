import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import Notes from "./notes";
import type { Square } from "@/sudoku/types";
import { PEERS } from "@/sudoku/const";
import { isInvalidMove } from "@/lib/helpers";

type Props = { id: Square };

const Cell: React.FC<Props> = ({ id }) => {
  const s = useStore((s) => s.squares[id]);
  const isHighlighted = useStore((s) => s.highlightedSquares.has(id));
  const selected = useStore((s) => s.squares[s.selectedSquare]);
  const selectSquare = useStore((s) => s.selectSquare);
  const isInvalid = useStore((s) => {
    const { value } = s.squares[id];
    if (value === null) return false;
    return isInvalidMove(s.squares, id, value);
  });

  const isPeer = PEERS[id].has(selected.id);

  return (
    <button
      onClick={() => selectSquare(id)}
      className={cn(
        "relative size-fit cursor-pointer text-2xl font-light transition-colors",
        {
          "border-r border-r-gray-400": s.col === "3" || s.col === "6",
          "border-l border-l-gray-400": s.col === "4" || s.col === "7",
          "border-b border-b-gray-400": s.row === "C" || s.row === "F",
          "border-t border-t-gray-400": s.row === "D" || s.row === "G",

          "text-sky-700": !s.given,
          "bg-gray-100": isPeer,
          "bg-sky-100": s.value === selected.value && s.value !== null,
          "text-destructive": isInvalid,
          "bg-primary": isHighlighted,
          "text-sky-100": isHighlighted && !s.given,
        },

        id === selected.id && {
          "bg-primary": true,
          "text-sky-200": !s.given,
          "text-primary-foreground": s.given,
          "bg-destructive text-white":
            s.value !== s.solution && s.value !== null,
        },
      )}
    >
      <div
        className={cn(
          "flex size-[min(calc((100vw-1.5rem)/9),3rem)] items-center justify-center",
          {
            "border-b border-b-gray-200":
              s.row !== "C" && s.row !== "F" && s.row !== "I",
            "border-r border-r-gray-200":
              s.col !== "3" && s.col !== "6" && s.col !== "9",
          },
        )}
      >
        {s.value ? s.value : <Notes notes={s.notes} />}
      </div>
    </button>
  );
};

export default Cell;
