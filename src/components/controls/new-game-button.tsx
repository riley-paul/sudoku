import React from "react";
import { Button } from "../ui/button";
import { RotateCcwIcon } from "lucide-react";
import useStore from "@/lib/store";
import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import KeyboardShortcut from "../ui/keyboard-shortcut";

const NewGameButton: React.FC = () => {
  const newGame = useStore((s) => s.newGame);

  useHotkey("Alt+N", newGame, { preventDefault: true });

  return (
    <Tooltip>
      <TooltipContent>
        New game
        <KeyboardShortcut>{formatForDisplay("Alt+N")}</KeyboardShortcut>
      </TooltipContent>
      <TooltipTrigger>
        <Button variant="ghost" size="icon-lg" onClick={newGame}>
          <RotateCcwIcon />
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

export default NewGameButton;
