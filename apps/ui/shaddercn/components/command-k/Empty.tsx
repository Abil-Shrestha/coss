"use client";

import type { ReactNode } from "react";
import { useCommandKContext } from "./context";
import type { CommandKEmptyProps } from "./types";

export function Empty({
  children = "No results found.",
  className = "",
  style,
}: CommandKEmptyProps): ReactNode {
  const { items, search, filter } = useCommandKContext();

  // Check if there are any visible items
  const hasVisibleItems = items.some(
    (item) =>
      !item.disabled &&
      (filter(item.value, search) ||
        item.keywords?.some((kw) => filter(kw, search))),
  );

  // Only show empty state when there's a search and no results
  if (hasVisibleItems || !search) {
    return null;
  }

  return (
    <div
      className={`py-6 text-center text-muted-foreground text-sm ${className}`}
      data-slot="command-k-empty"
      style={style}
    >
      {children}
    </div>
  );
}
