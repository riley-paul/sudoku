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
        "flex items-center justify-center border text-xl text-muted-foreground",
        (row === 2 || row === 5) && "border-b-2 border-b-foreground",
        (col === 2 || col === 5) && "border-r-2 border-r-foreground",
        row === selected?.row && "bg-muted",
        col === selected?.col && "bg-muted",
        value > 0 && "text-foreground",
        isSelected && "bg-primary text-primary-foreground",
      )}
      onClick={() => setSelected({ row, col })}
    >
      {value}
    </button>
  );
};

export default Square;
