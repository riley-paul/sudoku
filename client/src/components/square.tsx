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
  React.useEffect(() => {
    if (isSelected) {
      // console.log(`Selected square: ${row}, ${col}`);
      console.log(`Row modulo 3: ${(row) % 3}`);
    }
  });

  const isSelectedTangential =
    selected &&
    (row === selected.row ||
      col === selected.col ||
      selected.row - (row % 3) === row);
  const value = grid[row][col];

  return (
    <button
      className={cn(
        "flex items-center justify-center text-xl font-medium text-muted-foreground",
        isSelectedTangential && "bg-muted/50",
        value > 0 && "text-foreground",
        isSelected && "bg-primary/50 text-primary-foreground",
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
