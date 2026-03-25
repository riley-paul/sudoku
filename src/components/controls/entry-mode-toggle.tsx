import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useHotkey } from "@tanstack/react-hotkeys";
import KeyboardShortcut from "../ui/keyboard-shortcut";

const EntryModeToggle: React.FC = () => {
  const { entryMode, toggleEntryMode } = useStore(
    useShallow(({ entryMode, toggleEntryMode }) => ({
      entryMode,
      toggleEntryMode,
    })),
  );

  useHotkey("N", toggleEntryMode);

  return (
    <Label className="text-muted-foreground text-xs">
      <Switch
        size="sm"
        checked={entryMode === "note"}
        onCheckedChange={toggleEntryMode}
      />
      Note mode
      <KeyboardShortcut>N</KeyboardShortcut>
    </Label>
  );
};

export default EntryModeToggle;
