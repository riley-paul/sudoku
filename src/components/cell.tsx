import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";
import React from "react";
import Notes from "./notes";
import type { Square } from "@/sudoku/types";
import { PEERS } from "@/sudoku/const";

type Props = { id: Square };

const Cell: React.FC<Props> = ({ id }) => {
  const s = useStore((s) => s.squares[id]);
  const selected = useStore((s) => s.squares[s.selectedSquare]);
  const selectSquare = useStore((s) => s.selectSquare);

  const isPeer = PEERS[id].has(selected.id);

  return (
    <button
      onClick={() => selectSquare(id)}
      className={cn(
        "relative size-fit cursor-pointer text-base font-extralight transition-all duration-100 ease-in md:text-2xl",
        {
          "border-r border-r-gray-400": s.col === "3" || s.col === "6",
          "border-l border-l-gray-400": s.col === "4" || s.col === "7",
          "border-b border-b-gray-400": s.row === "C" || s.row === "F",
          "border-t border-t-gray-400": s.row === "D" || s.row === "G",

          "text-sky-800": !s.given,
          "bg-gray-100": isPeer,
          "bg-sky-100": s.value === selected.value && s.value !== null,
          "bg-primary text-primary-foreground": id === selected.id,
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
        {s.value}
        {/*{s.value ? s.value : <Notes notes={s.notes} />}*/}
      </div>
    </button>
  );
};

export default Cell;
