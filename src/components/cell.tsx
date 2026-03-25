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

  const isPeer =
    isSameBoxAsSelected || isSameColAsSelected || isSameRowAsSelected;

  return (
    <button
      onClick={() => selectCell(id)}
      className={cn(
        "relative size-fit cursor-pointer text-base font-extralight transition-all duration-75 ease-in md:text-2xl",
        {
          "border-r border-r-gray-400": cell.col === 2 || cell.col === 5,
          "border-l border-l-gray-400": cell.col === 3 || cell.col === 6,
          "border-b border-b-gray-400": cell.row === 2 || cell.row === 5,
          "border-t border-t-gray-400": cell.row === 3 || cell.row === 6,

          "text-sky-800": !cell.given,
          "bg-gray-100": isPeer,
          "bg-sky-100": isSameValueAsSelected,
          "bg-primary text-primary-foreground": isSelected,
        },
      )}
    >
      <div
        className={cn("flex size-8 items-center justify-center md:size-10", {
          "border-b border-b-gray-200":
            cell.row !== 2 && cell.row !== 5 && cell.row !== 8,
          "border-r border-r-gray-200":
            cell.col !== 2 && cell.col !== 5 && cell.col !== 8,
        })}
      >
        {cell.value ? cell.value : <Notes notes={cell.notes} />}
      </div>
    </button>
  );
};

export default Cell;
