import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import useStore from "@/lib/store";

const BoardFooter: React.FC = () => {
  const mode = useStore((s) => s.mode);

  return (
    <div className="w-full">
      <Label className="text-muted-foreground text-xs">
        <Switch
          size="sm"
          checked={mode === "note"}
          onCheckedChange={() => {
            const currentMode = useStore.getState().mode;
            useStore.setState({
              mode: currentMode === "value" ? "note" : "value",
            });
          }}
        />
        Note mode
      </Label>
    </div>
  );
};

export default BoardFooter;
