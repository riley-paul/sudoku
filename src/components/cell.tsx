import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";

type Props = { id: string };

const Cell: React.FC<Props> = ({ id }) => {
  const { cell, selectCell } = useStore((s) => ({
    cell: s.cells[id],
    selectCell: s.selectCell,
  }));

  return (
    <button
      onClick={() => selectCell(id)}
      className={cn("size-12 border border-gray-200", {
        "border-t-0": cell.row === 0,
        "border-b-0": cell.row === 8,
        "border-l-0": cell.col === 0,
        "border-r-0": cell.col === 8,
        "border-r-gray-400": cell.col === 2 || cell.col === 5,
        "border-l-gray-400": cell.col === 3 || cell.col === 6,
        "border-b-gray-400": cell.row === 2 || cell.row === 5,
        "border-t-gray-400": cell.row === 3 || cell.row === 6,
        "outline-2 outline-sky-500": cell.isSelected,
      })}
    >
      {cell?.value}
    </button>
  );
};

export default Cell;
