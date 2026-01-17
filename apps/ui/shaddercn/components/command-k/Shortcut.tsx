"use client";

import type { ReactNode } from "react";
import type { CommandKShortcutProps } from "./types";

export function Shortcut({
  children,
  className = "",
  style,
}: CommandKShortcutProps): ReactNode {
  return (
    <kbd
      className={`pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground ${className}`}
      data-slot="command-k-shortcut"
      style={style}
    >
      {children}
    </kbd>
  );
}

export function ShortcutGroup({
  children,
  className = "",
  style,
}: CommandKShortcutProps): ReactNode {
  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      data-slot="command-k-shortcut-group"
      style={style}
    >
      {children}
    </div>
  );
}
