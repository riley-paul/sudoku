import useStore from "@/lib/store";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";
import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { UndoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import KeyboardShortcut from "../ui/keyboard-shortcut";

const UndoButton: React.FC = () => {
  const { canUndo, undo } = useStore(
    useShallow(({ history, undo }) => ({
      canUndo: history.length > 0,
      undo,
    })),
  );

  useHotkey("Mod+Z", undo);

  return (
    <Tooltip>
      <TooltipContent>
        Undo
        <KeyboardShortcut>{formatForDisplay("Mod+Z")}</KeyboardShortcut>
      </TooltipContent>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={undo}
          disabled={!canUndo}
        >
          <UndoIcon />
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

export default UndoButton;
