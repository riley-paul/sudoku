import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Button } from "./ui/button";

const BoardFooter: React.FC = () => {
  const { entryMode, toggleEntryMode, undo } = useStore(
    useShallow(({ entryMode, toggleEntryMode, undo }) => ({
      entryMode,
      toggleEntryMode,
      undo,
    })),
  );

  useHotkey("N", toggleEntryMode);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Label className="text-muted-foreground text-xs">
        <Switch
          size="sm"
          checked={entryMode === "note"}
          onCheckedChange={toggleEntryMode}
        />
        Note mode
        <div className="bg-muted text-muted-foreground flex size-4 items-center justify-center rounded-sm border text-[0.5rem]">
          N
        </div>
      </Label>
      <Button variant="ghost" size="sm" className="text-xs" onClick={undo}>
        Undo
      </Button>
    </div>
  );
};

export default BoardFooter;
