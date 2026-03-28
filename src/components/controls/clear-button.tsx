import React, { useMemo } from "react";
import { Button } from "../ui/button";
import { EraserIcon } from "lucide-react";
import useStore from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useHotkey } from "@tanstack/react-hotkeys";
import { blurActiveElement } from "@/lib/utils";

const ClearButton: React.FC = () => {
  const { selectedSquare, clearSquare, selected } = useStore(
    useShallow(({ selectedSquare, clearSquare, squares }) => ({
      selectedSquare,
      clearSquare,
      selected: squares[selectedSquare],
    })),
  );

  const canClear = useMemo(() => {
    if (selected.given) return false;
    return selected.value !== null || selected.notes.size > 0;
  }, [selected]);

  const handleClear = () => {
    blurActiveElement();
    clearSquare(selectedSquare);
  };

  useHotkey("Backspace", handleClear);

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={handleClear}
      disabled={!canClear}
    >
      <EraserIcon />
    </Button>
  );
};

export default ClearButton;
