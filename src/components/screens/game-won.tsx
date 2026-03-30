import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import useStore from "@/lib/store";
import { Button } from "../ui/button";
import { RotateCcwIcon, TrophyIcon } from "lucide-react";
import Confetti from "react-confetti";

import { useIsClient, useWindowSize } from "usehooks-ts";
import DummyBoard from "../dummy-board";

const GameWon: React.FC = () => {
  const newGame = useStore((s) => s.newGame);
  const isClient = useIsClient();
  const { width, height } = useWindowSize();

  const squares = useStore((s) => s.squares);

  return (
    <>
      {isClient && <Confetti width={width} height={height} />}
      <Empty>
        <EmptyHeader>
          <EmptyMedia className="rounded-full bg-amber-100 p-3 text-amber-500">
            <TrophyIcon className="size-10" />
          </EmptyMedia>
          <EmptyTitle>YOU WON!!</EmptyTitle>
          <EmptyDescription>
            Congratulations on completing the puzzle! Your dedication and
            problem-solving skills have paid off. Feel free to start a new game
            and challenge yourself again!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={newGame}>
            <RotateCcwIcon />
            New game
          </Button>
        </EmptyContent>
        <DummyBoard squares={squares} />
      </Empty>
    </>
  );
};

export default GameWon;
