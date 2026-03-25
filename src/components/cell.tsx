import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";
import React from "react";
import Notes from "./notes";

type Props = { id: string };

const Cell: React.FC<Props> = ({ id }) => {
  const {
    cell,
    isSelected,
    isSameValueAsSelected,
    isSameBoxAsSelected,
    isSameColAsSelected,
    isSameRowAsSelected,
    selectCell,
  } = useStore(
    useShallow((s) => ({
      cell: s.cells[id],
      isSelected: s.selectedCellId === id,
      isSameValueAsSelected:
        s.selectedCellId !== null &&
        s.cells[s.selectedCellId]?.value !== null &&
        s.cells[s.selectedCellId]?.value === s.cells[id]?.value,
      isSameBoxAsSelected:
        s.selectedCellId !== null &&
        s.cells[s.selectedCellId]?.box === s.cells[id]?.box,
      isSameRowAsSelected:
        s.selectedCellId !== null &&
        s.cells[s.selectedCellId]?.row === s.cells[id]?.row,
      isSameColAsSelected:
        s.selectedCellId !== null &&
        s.cells[s.selectedCellId]?.col === s.cells[id]?.col,
      selectCell: s.selectCell,
    })),
  );

  return (
    <button
      onClick={() => selectCell(id)}
      className={cn(
        "relative size-8 cursor-pointer text-base font-extralight transition-all duration-75 ease-in md:size-10 md:text-2xl",
        {
          "after:absolute after:inset-0 after:border after:border-transparent": true,
          "before:absolute before:inset-0 before:border before:border-transparent": true,
          "border-r border-r-gray-400": cell.col === 2 || cell.col === 5,
          "border-l border-l-gray-400": cell.col === 3 || cell.col === 6,
          "border-b border-b-gray-400": cell.row === 2 || cell.row === 5,
          "border-t border-t-gray-400": cell.row === 3 || cell.row === 6,
          "after:border-b-gray-200":
            cell.row !== 2 && cell.row !== 5 && cell.row !== 8,
          "before:border-r-gray-200":
            cell.col !== 2 && cell.col !== 5 && cell.col !== 8,
          "bg-gray-100":
            isSameBoxAsSelected || isSameColAsSelected || isSameRowAsSelected,
          "bg-sky-100": isSameValueAsSelected,
          "bg-sky-600 text-white": isSelected,
        },
      )}
    >
      {cell.value ? cell.value : <Notes notes={cell.notes} />}
    </button>
  );
};

export default Cell;
