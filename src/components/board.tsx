import { GRID } from "@/lib/helpers";
import React from "react";
import Cell from "./cell";

const Board: React.FC = () => {
  return (
    <div className="grid w-fit grid-cols-9 border-2 border-gray-600">
      {GRID.flat().map((id) => (
        <Cell key={id} id={id} />
      ))}
    </div>
  );
};

export default Board;
