import { ZERO_TO_EIGHT } from "@/lib/constants.ts";
import React from "react";
import { Button } from "./ui/button.tsx";
import useStore from "@/lib/store.ts";

const Options: React.FC = () => {
  const { getRemaining, setCellSelected } = useStore();
  const remaining = getRemaining();
  return (
    <div className="flex justify-between gap-2">
      {ZERO_TO_EIGHT.map((i) => (
        <Button
          variant="secondary"
          className="h-auto w-full flex-col py-1"
          size="icon"
          key={i}
          onClick={() => setCellSelected(i + 1)}
        >
          <div className="text-3xl text-primary">{i + 1}</div>

          <div className="text-sm text-muted-foreground">
            {remaining[i] === 0 ? "✓" : remaining[i]}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default Options;
