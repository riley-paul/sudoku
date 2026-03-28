import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useHotkey } from "@tanstack/react-hotkeys";

import { isPuzzleComplete } from "@/lib/helpers";
import { gridToSquares, squaresToGrid } from "@/lib/transform";
import useStore from "@/lib/store";
import { constrain, search } from "@/sudoku/solve";

import GameOver from "@/components/screens/game-over";
import GameWon from "@/components/screens/game-won";
import Game from "@/components/screens/game";
import Loading from "@/components/screens/loading";
import { useIsClient } from "usehooks-ts";

const AppContent: React.FC = () => {
  const strikes = useStore((s) => s.strikes);
  const hasWon = useStore((s) => isPuzzleComplete(s.squares));

  const isClient = useIsClient();

  if (!isClient) return <Loading />;
  if (hasWon) return <GameWon />;
  if (strikes >= 3) return <GameOver />;
  return <Game />;
};

const App: React.FC = () => {
  useHotkey("Mod+Shift+S", () => {
    const { squares } = useStore.getState();
    const grid = squaresToGrid(squares);
    const solution = search(constrain(grid));
    if (solution) {
      useStore.setState({ squares: gridToSquares(solution) });
    }
  });

  return (
    <TooltipProvider delayDuration={1_000}>
      <AppContent />
    </TooltipProvider>
  );
};

export default App;
