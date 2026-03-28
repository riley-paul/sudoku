import React from "react";
import { Empty, EmptyContent } from "@/components/ui/empty";
import { Spinner } from "../ui/spinner";

const Loading: React.FC = () => {
  return (
    <Empty>
      <EmptyContent>
        <Spinner className="text-primary size-6" />
      </EmptyContent>
    </Empty>
  );
};

export default Loading;
