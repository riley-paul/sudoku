import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Button } from "./ui/button";

const BoardFooter: React.FC = () => {
  const { mode, toggleMode, undo } = useStore(
    useShallow(({ mode, toggleMode, undo }) => ({ mode, toggleMode, undo })),
  );

  useHotkey("N", toggleMode);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Label className="text-muted-foreground text-xs">
        <Switch
          size="sm"
          checked={mode === "note"}
          onCheckedChange={toggleMode}
        />
        Note mode
        <div className="bg-muted text-muted-foreground flex size-4 items-center justify-center rounded-sm border text-[0.5rem]">
          N
        </div>
      </Label>
      <Button variant="ghost" size="sm" onClick={undo}>
        Undo
      </Button>
    </div>
  );
};

export default BoardFooter;
