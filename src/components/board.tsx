import { GRID } from "@/lib/helpers";
import React from "react";
import Cell from "./cell";

const Board: React.FC = () => {
  return (
    <div className="grid w-fit grid-cols-9 border-2 border-black">
      {GRID.flat().map((id) => (
        <Cell key={id} id={id} />
      ))}
    </div>
  );
};

export default Board;
