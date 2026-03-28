import React, { useState } from "react";
import { Button } from "../ui/button";
import { RotateCcwIcon } from "lucide-react";
import useStore from "@/lib/store";
import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import KeyboardShortcut from "../ui/keyboard-shortcut";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NewGameButton: React.FC = () => {
  const newGame = useStore((state) => state.newGame);
  const [open, setOpen] = useState(false);

  useHotkey("Alt+N", () => setOpen(true), { preventDefault: true });

  const handleConfirm = async () => {
    await newGame();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipContent>
          New game
          <KeyboardShortcut>{formatForDisplay("Alt+N")}</KeyboardShortcut>
        </TooltipContent>

        <TooltipTrigger>
          <AlertDialogTrigger>
            <Button variant="ghost" size="icon-lg">
              <RotateCcwIcon />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
      </Tooltip>

      <AlertDialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to start a new game?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will reset your current progress and start a new game. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewGameButton;
