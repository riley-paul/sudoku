import { blurActiveElement } from "@/lib/utils";
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

const setValueHotKeys: {
  key: RegisterableHotkey;
  shiftKey: RegisterableHotkey;
  value: Digit;
}[] = [
  { key: "1", shiftKey: "Shift+1", value: "1" },
  { key: "2", shiftKey: "Shift+2", value: "2" },
  { key: "3", shiftKey: "Shift+3", value: "3" },
  { key: "4", shiftKey: "Shift+4", value: "4" },
  { key: "5", shiftKey: "Shift+5", value: "5" },
  { key: "6", shiftKey: "Shift+6", value: "6" },
  { key: "7", shiftKey: "Shift+7", value: "7" },
  { key: "8", shiftKey: "Shift+8", value: "8" },
  { key: "9", shiftKey: "Shift+9", value: "9" },
];

const Board: React.FC = () => {
  const { moveSelection, setSquareValue, toggleSquareNote, selectedSquare } =
    useStore(
      useShallow(
        ({
          moveSelection,
          selectedSquare,
          toggleSquareNote,
          setSquareValue,
        }) => ({
          toggleSquareNote,
          moveSelection,
          setSquareValue,
          selectedSquare,
        }),
      ),
    );

  const entryMode = useStore((s) => s.entryMode);

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
        blurActiveElement();
        if (entryMode === "value") setSquareValue(selectedSquare, value);
        if (entryMode === "note") toggleSquareNote(selectedSquare, value);
      },
    })),
  );

  useHotkeys(
    setValueHotKeys.map(({ shiftKey, value }) => ({
      hotkey: shiftKey,
      callback: () => {
        blurActiveElement();
        toggleSquareNote(selectedSquare, value);
      },
    })),
  );

  return (
    <div className="bg-card grid w-fit grid-cols-[repeat(9,auto)] border-2 border-gray-600">
      {SQUARES.flat().map((id) => (
        <Cell key={id} id={id} />
      ))}
    </div>
  );
};

export default Board;
