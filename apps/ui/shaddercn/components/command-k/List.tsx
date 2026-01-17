"use client";

import type { ReactNode } from "react";
import type { CommandKListProps } from "./types";

export function List({
  children,
  className = "",
  style,
  maxHeight = 300,
}: CommandKListProps): ReactNode {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden p-2 ${className}`}
      data-slot="command-k-list"
      style={{
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
