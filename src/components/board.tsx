import { blurActiveElement, GRID } from "@/lib/helpers";
import React from "react";
import { useHotkeys } from "@tanstack/react-hotkeys";

import Cell from "./cell";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

const moveHotKeys = [
  { key: "ArrowUp", direction: "up" },
  { key: "ArrowDown", direction: "down" },
  { key: "ArrowLeft", direction: "left" },
  { key: "ArrowRight", direction: "right" },
] as const;

const setValueHotKeys = [
  { key: "1", value: 1 },
  { key: "2", value: 2 },
  { key: "3", value: 3 },
  { key: "4", value: 4 },
  { key: "5", value: 5 },
  { key: "6", value: 6 },
  { key: "7", value: 7 },
  { key: "8", value: 8 },
  { key: "9", value: 9 },
] as const;

const Board: React.FC = () => {
  const { moveSelection, selectedCellId, setCellValue } = useStore(
    useShallow(({ moveSelection, selectedCellId, setCellValue }) => ({
      moveSelection,
      selectedCellId,
      setCellValue,
    })),
  );

  useHotkeys(
    moveHotKeys.map(({ key, direction }) => ({
      hotkey: key,
      callback: () => {
        blurActiveElement();
        moveSelection(direction);
      },
    })),
  );

  useHotkeys(
    setValueHotKeys.map(({ key, value }) => ({
      hotkey: key,
      callback: () => {
        if (selectedCellId) setCellValue(selectedCellId, value);
      },
    })),
  );

  return (
    <div className="grid w-fit grid-cols-9 border-2 border-gray-600">
      {GRID.flat().map((id) => (
        <Cell key={id} id={id} />
      ))}
    </div>
  );
};

export default Board;
