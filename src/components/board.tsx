import { blurActiveElement } from "@/lib/helpers";
import React from "react";
import { useHotkeys, type RegisterableHotkey } from "@tanstack/react-hotkeys";

import Cell from "./cell";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { SQUARES } from "@/sudoku/const";
import type { Digit } from "@/sudoku/types";

const moveHotKeys = [
  { key: "ArrowUp", direction: "up" },
  { key: "ArrowDown", direction: "down" },
  { key: "ArrowLeft", direction: "left" },
  { key: "ArrowRight", direction: "right" },
] as const;

const setValueHotKeys: { key: RegisterableHotkey; value: Digit }[] = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
  { key: "3", value: "3" },
  { key: "4", value: "4" },
  { key: "5", value: "5" },
  { key: "6", value: "6" },
  { key: "7", value: "7" },
  { key: "8", value: "8" },
  { key: "9", value: "9" },
];

const Board: React.FC = () => {
  const { moveSelection, setSquareValue, selectedSquare } = useStore(
    useShallow(({ moveSelection, selectedSquare, setSquareValue }) => ({
      moveSelection,
      setSquareValue,
      selectedSquare,
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
        setSquareValue(selectedSquare, value);
      },
    })),
  );

  return (
    <div className="grid w-fit grid-cols-[repeat(9,auto)] border-2 border-gray-600">
      {SQUARES.flat().map((id) => (
        <Cell key={id} id={id} />
      ))}
    </div>
  );
};

export default Board;
