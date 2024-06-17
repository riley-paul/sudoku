import { ZERO_TO_EIGHT } from "@/lib/constants.ts";
import React from "react";
import Square from "./square.tsx";

const Grid: React.FC = () => {
  return (
    <div className="grid aspect-square grid-cols-9 border-2 border-foreground">
      {ZERO_TO_EIGHT.map((j) =>
        ZERO_TO_EIGHT.map((i) => <Square key={`${j}-${i}`} row={j} col={i} />),
      )}
    </div>
  );
};

export default Grid;
