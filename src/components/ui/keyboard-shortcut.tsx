import React from "react";

const KeyboardShortcut: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-muted text-muted-foreground rounded-sm border text-2xs px-1 py-0.5">
      {children}
    </div>
  );
};

export default KeyboardShortcut;
