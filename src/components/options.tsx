import React from "react";
import { Button } from "./ui/button";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

const Options: React.FC = () => {
  const {
    selectedCellId,
    setCellValue,
    cells,
    entryMode,
    toggleCellNote,
    selectedCellNotes,
  } = useStore(
    useShallow(
      ({ selectedCellId, setCellValue, toggleCellNote, cells, entryMode }) => ({
        selectedCellId,
        selectedCellNotes: selectedCellId
          ? cells[selectedCellId]?.notes
          : undefined,
        setCellValue,
        toggleCellNote,
        cells,
        entryMode,
      }),
    ),
  );

  return (
    <div className="grid w-full grid-cols-9 gap-1">
      {Array.from({ length: 9 }).map((_, idx) => {
        const value = idx + 1;
        const numWithValue = Object.values(cells).filter(
          (cell) => cell.value === value,
        ).length;
        const numRemaining = 9 - numWithValue;
        const notesHasValue = selectedCellNotes?.includes(value);

        return (
          <Button
            key={value}
            size="sm"
            variant="outline"
            className={cn("flex h-14 flex-col p-0 md:h-16", {
              "opacity-0!": numRemaining <= 0,
            })}
            disabled={numRemaining <= 0}
            onClick={() => {
              if (selectedCellId) {
                if (entryMode === "value") {
                  setCellValue(selectedCellId, value);
                } else if (entryMode === "note") {
                  toggleCellNote(selectedCellId, value);
                }
              }
            }}
          >
            <div
              className={cn("text-primary text-lg font-light md:text-2xl", {
                "text-muted-foreground": entryMode === "note",
                "text-muted-foreground/50": entryMode === "note" && notesHasValue,
              })}
            >
              {value}
            </div>
            <div className="text-muted-foreground text-xs font-light">
              {numRemaining}
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default Options;
