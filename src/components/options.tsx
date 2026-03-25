import React from "react";
import { Button } from "./ui/button";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

const Options: React.FC = () => {
  const { selectedCellId, setValue, cells } = useStore(
    useShallow(({ selectedCellId, setValue, cells }) => ({
      selectedCellId,
      setValue,
      cells,
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

        const isDisabled = numRemaining <= 0;

        return (
          <Button
            size="sm"
            variant="outline"
            className={cn("flex h-14 flex-col p-0 md:h-16", {
              "opacity-0!": isDisabled,
            })}
            disabled={isDisabled}
            onClick={() => {
              if (selectedCellId) {
                setValue(selectedCellId, value);
              }
            }}
          >
            <div className="text-primary text-lg font-light md:text-2xl">
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
