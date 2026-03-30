import useStore from "@/lib/store";
import React from "react";
import { Button } from "../ui/button";
import { formatForDisplay } from "@tanstack/react-hotkeys";
import { ZapIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import KeyboardShortcut from "../ui/keyboard-shortcut";

const AutoNoteButton: React.FC = () => {
  const autoNotes = useStore((s) => s.autoNotes);

  return (
    <Tooltip>
      <TooltipContent>
        Auto notes
        <KeyboardShortcut>{formatForDisplay("Mod+Z")}</KeyboardShortcut>
      </TooltipContent>
      <TooltipTrigger>
        <Button variant="ghost" size="icon-lg" onClick={autoNotes}>
          <ZapIcon />
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

export default AutoNoteButton;
