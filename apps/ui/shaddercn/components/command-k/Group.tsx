"use client";

import type { ReactNode } from "react";
import type { CommandKGroupProps } from "./types";

export function Group({
  children,
  heading,
  className = "",
  style,
}: CommandKGroupProps): ReactNode {
  return (
    <div
      className={`py-1 ${className}`}
      data-slot="command-k-group"
      style={style}
    >
      {heading && (
        <div
          className="px-3 py-1.5 font-medium text-muted-foreground text-xs"
          data-slot="command-k-group-heading"
        >
          {heading}
        </div>
      )}
      <div data-slot="command-k-group-items">{children}</div>
    </div>
  );
}
