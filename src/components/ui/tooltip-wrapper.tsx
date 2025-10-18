import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import React from "react";

interface TooltipProviderProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function TooltipWrapper({ children, content }: TooltipProviderProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="mx-4">
          <div className="max-w-lg">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
