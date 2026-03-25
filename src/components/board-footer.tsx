import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useHotkey } from "@tanstack/react-hotkeys";

const BoardFooter: React.FC = () => {
  const { mode, toggleMode } = useStore(
    useShallow(({ mode, toggleMode }) => ({ mode, toggleMode })),
  );

  useHotkey("N", toggleMode);

  return (
    <div className="w-full">
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
    </div>
  );
};

export default BoardFooter;
