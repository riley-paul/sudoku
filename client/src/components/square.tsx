import React from "react";

type Props = {
  value: number;
};

const Square: React.FC<Props> = (props) => {
  const { value } = props;

  return <div>{value}</div>;
};

export default Square;
