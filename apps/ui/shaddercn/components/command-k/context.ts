"use client";

import { createContext, useContext } from "react";
import type { CommandKContextValue } from "./types";

export const CommandKContext = createContext<CommandKContextValue | null>(null);

export function useCommandKContext(): CommandKContextValue {
  const context = useContext(CommandKContext);
  if (!context) {
    throw new Error(
      "CommandK compound components must be used within a CommandK.Root component",
    );
  }
  return context;
}
