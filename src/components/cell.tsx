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
  const selectSquare = useStore((s) => s.selectSquare);

  const className = useStore((s) => {
    const square = s.squares[id];

    const isPeer = PEERS[id].has(s.selectedSquare);
    const isHighlighted = s.highlightedSquares.has(id);
    const isSelected = s.selectedSquare === id;
    const isUser = !square.given;
    const isInvalid =
      square.value !== null && isInvalidMove(s.squares, id, square.value);
    const isSameValueAsSelected =
      square.value !== null &&
      square.value === s.squares[s.selectedSquare].value;

    return cn(
      "text-muted-foreground",
      {
        "bg-gray-100 dark:bg-gray-800/50": isPeer,
        "text-primary": isUser,
        "text-destructive": isInvalid,
      },
      isSelected || isHighlighted
        ? {
            "bg-primary text-primary-foreground": true,
            "text-secondary": isUser,
            "bg-destructive": isInvalid,
          }
        : {
            "bg-sky-100 dark:bg-sky-950": isSameValueAsSelected,
          },
    );
  });

  return (
    <button
      onClick={() => selectSquare(id)}
      className={cn(
        "relative size-fit cursor-pointer text-3xl font-light transition-colors",
        {
          "border-r border-r-gray-400 dark:border-gray-700":
            s.col === "3" || s.col === "6",
          "border-l border-l-gray-400 dark:border-gray-700":
            s.col === "4" || s.col === "7",
          "border-b border-b-gray-400 dark:border-gray-700":
            s.row === "C" || s.row === "F",
          "border-t border-t-gray-400 dark:border-gray-700":
            s.row === "D" || s.row === "G",
        },
        className,
      )}
    >
      <div
        className={cn(
          "flex size-[min(calc((100vw-1.5rem)/9),3rem)] items-center justify-center",
          {
            "border-b border-b-gray-200 dark:border-gray-800":
              s.row !== "C" && s.row !== "F" && s.row !== "I",
            "border-r border-r-gray-200 dark:border-gray-800":
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
