import useStore from "@/lib/store.ts";
import { cn } from "@/lib/utils.ts";
import React from "react";

type Props = {
  row: number;
  col: number;
};

const Square: React.FC<Props> = (props) => {
  const { row, col } = props;
  const { grid, setSelected, selected } = useStore();

  const isSelected = selected?.row === row && selected?.col === col;
  const value = grid[row][col];

  return (
    <button
      className={cn(
        "flex items-center justify-center text-xl text-muted-foreground",
        row === selected?.row && "bg-muted",
        col === selected?.col && "bg-muted",
        value > 0 && "text-foreground",
        isSelected && "bg-primary text-primary-foreground",
        value === 0 && "text-transparent",
        col > 0 && "border-l",
        row > 0 && "border-t",
        col % 3 === 0 && col > 0 && "border-l-2 border-l-foreground",
        row % 3 === 0 && row > 0 && "border-t-2 border-t-foreground",

      )}
      onClick={() => setSelected({ row, col })}
    >
      {value}
    </button>
  );
};

export default Square;
