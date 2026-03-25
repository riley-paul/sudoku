import React from "react";

const KeyboardShortcut: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-muted text-muted-foreground flex size-4 items-center justify-center rounded-sm border text-[0.5rem]">
      {children}
    </div>
  );
};

export default KeyboardShortcut;
