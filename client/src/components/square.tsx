import useStore from "@/lib/store.ts";
import React from "react";

type Props = {
  row: number;
  col: number;
};

const Square: React.FC<Props> = (props) => {
  const { row, col } = props;
  const { grid } = useStore();

  return (
    <div className="flex items-center justify-center border text-xl">
      {grid[row][col]}
    </div>
  );
};

export default Square;
