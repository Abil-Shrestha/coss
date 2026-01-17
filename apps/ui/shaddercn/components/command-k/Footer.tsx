"use client";

import type { ReactNode } from "react";
import type { CommandKFooterProps } from "./types";

export function Footer({
  children,
  className = "",
  style,
}: CommandKFooterProps): ReactNode {
  return (
    <div
      className={`flex items-center justify-between gap-2 border-t px-4 py-2.5 text-muted-foreground text-xs ${className}`}
      data-slot="command-k-footer"
      style={style}
    >
      {children}
    </div>
  );
}
