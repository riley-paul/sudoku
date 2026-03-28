import useStore from "@/lib/store";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";
import { useHotkey } from "@tanstack/react-hotkeys";
import { UndoIcon } from "lucide-react";

const UndoButton: React.FC = () => {
  const { canUndo, undo } = useStore(
    useShallow(({ history, undo }) => ({
      canUndo: history.length > 0,
      undo,
    })),
  );

  useHotkey("Mod+Z", undo);

  return (
    <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo}>
      <UndoIcon />
    </Button>
  );
};

export default UndoButton;
