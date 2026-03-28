import { cn } from "@/lib/utils";
import React from "react";
import { useIsClient } from "usehooks-ts";
import { Spinner } from "../ui/spinner";

const LoadingScreen: React.FC = () => {
  const isClient = useIsClient();
  return (
    <div
      className={cn(
        "bg-background/70 fixed inset-0 flex items-center justify-center transition-opacity",
        isClient && "pointer-events-none opacity-0",
      )}
    >
      <Spinner className="text-primary size-6" />
    </div>
  );
};

export default LoadingScreen;
