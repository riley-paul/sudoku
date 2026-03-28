import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import Notes from "./notes";
import type { Square } from "@/sudoku/types";
import { PEERS, SQUARES } from "@/sudoku/const";

type Props = { id: Square };

const Cell: React.FC<Props> = ({ id }) => {
  const s = useStore((s) => s.squares[id]);
  const selected = useStore((s) => s.squares[s.selectedSquare]);
  const selectSquare = useStore((s) => s.selectSquare);
  const isInvalid = useStore((s) => {
    const { value } = s.squares[id];
    if (value === null) return false;

    const squaresWithValue = SQUARES.filter(
      (square) => s.squares[square].value === value,
    );
    return squaresWithValue.some((i) => PEERS[id].has(i));
  });

  const isPeer = PEERS[id].has(selected.id);

  return (
    <button
      onClick={() => selectSquare(id)}
      className={cn(
        "relative size-fit cursor-pointer text-base font-extralight md:text-2xl",
        {
          "border-r border-r-gray-400": s.col === "3" || s.col === "6",
          "border-l border-l-gray-400": s.col === "4" || s.col === "7",
          "border-b border-b-gray-400": s.row === "C" || s.row === "F",
          "border-t border-t-gray-400": s.row === "D" || s.row === "G",

          "text-sky-800": !s.given,
          "bg-gray-100": isPeer,
          "bg-sky-100": s.value === selected.value && s.value !== null,
          "text-destructive": isInvalid,
        },

        id === selected.id && {
          "bg-primary text-primary-foreground": true,
          "bg-destructive text-white": isInvalid,
        },
      )}
    >
      <div
        className={cn("flex size-8 items-center justify-center md:size-10", {
          "border-b border-b-gray-200":
            s.row !== "C" && s.row !== "F" && s.row !== "I",
          "border-r border-r-gray-200":
            s.col !== "3" && s.col !== "6" && s.col !== "9",
        })}
      >
        {s.value ? s.value : <Notes notes={s.notes} />}
      </div>
    </button>
  );
};

export default Cell;
