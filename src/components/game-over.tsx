import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RotateCwIcon, SkullIcon } from "lucide-react";
import { Button } from "./ui/button";

const GameOver: React.FC = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia className="bg-destructive/10 text-destructive rounded-full p-2">
          <SkullIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>GAME OVER</EmptyTitle>
        <EmptyDescription>
          Better luck next time! Don't worry, you can always start a new game
          and try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => window.location.reload()}>
          <RotateCwIcon />
          New game
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default GameOver;
