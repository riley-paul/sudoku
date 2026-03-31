import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RotateCcwIcon, SkullIcon } from "lucide-react";
import { Button } from "../ui/button";
import useStore from "@/lib/store";
import DummyBoard from "../dummy-board";

const GameOver: React.FC = () => {
  const newGame = useStore((s) => s.newGame);
  const squares = useStore((s) => s.squares);

  return (
    <Empty className="px-15">
      <EmptyHeader>
        <EmptyMedia className="bg-destructive/10 text-destructive rounded-full p-3">
          <SkullIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>GAME OVER</EmptyTitle>
        <EmptyDescription>
          Better luck next time! Don't worry, you can always start a new game
          and try again.
        </EmptyDescription>
      </EmptyHeader>
      <div className="py-4">
        <DummyBoard squares={squares} />
      </div>
      <EmptyContent className="grid sm:grid-cols-2">
        <Button variant="secondary" onClick={newGame}>
          <RotateCcwIcon />
          Retry
        </Button>
        <Button onClick={newGame}>
          <RotateCcwIcon />
          New game
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default GameOver;
