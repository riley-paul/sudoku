import React from "react";
import { Button } from "./ui/button";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

const Options: React.FC = () => {
  const {
    selectedCellId,
    setValue,
    cells,
    mode,
    toggleNote,
    selectedCellNotes,
  } = useStore(
    useShallow(({ selectedCellId, setValue, toggleNote, cells, mode }) => ({
      selectedCellId,
      selectedCellNotes: selectedCellId
        ? cells[selectedCellId]?.notes
        : undefined,
      setValue,
      toggleNote,
      cells,
      mode,
    })),
  );

  return (
    <div className="grid w-full grid-cols-9 gap-1">
      {Array.from({ length: 9 }).map((_, idx) => {
        const value = idx + 1;
        const numWithValue = Object.values(cells).filter(
          (cell) => cell.value === value,
        ).length;
        const numRemaining = 9 - numWithValue;
        const notesHasValue = selectedCellNotes?.has(value);

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
                if (mode === "value") {
                  setValue(selectedCellId, value);
                } else if (mode === "note") {
                  toggleNote(selectedCellId, value);
                }
              }
            }}
          >
            <div
              className={cn("text-primary text-lg font-light md:text-2xl", {
                "text-muted-foreground": mode === "note",
                "text-muted-foreground/50": mode === "note" && notesHasValue,
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
