"use client";

import type { ReactNode } from "react";
import type { CommandKSeparatorProps } from "./types";

export function Separator({
  className = "",
  style,
}: CommandKSeparatorProps): ReactNode {
  return (
    <div
      aria-hidden="true"
      className={`-mx-1 my-1 h-px bg-border ${className}`}
      data-slot="command-k-separator"
      style={style}
    />
  );
}
