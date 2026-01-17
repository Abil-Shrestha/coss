"use client";

import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { useCommandKContext } from "./context";
import type { CommandKInputProps } from "./types";

export function Input({
  placeholder = "Type a command or search...",
  className = "",
  style,
  startAddon,
  endAddon,
  autoFocus = true,
}: CommandKInputProps): ReactNode {
  const {
    search,
    setSearch,
    open,
    setOpen,
    items,
    highlightedIndex,
    setHighlightedIndex,
    filter,
  } = useCommandKContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search
  const filteredItems = items.filter(
    (item) =>
      !item.disabled &&
      (filter(item.value, search) ||
        item.keywords?.some((kw) => filter(kw, search))),
  );

  // Auto focus when dialog opens
  useEffect(() => {
    if (open && autoFocus && inputRef.current) {
      // Small delay to ensure dialog is rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open, autoFocus]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex(
            Math.min(highlightedIndex + 1, filteredItems.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
          break;
        case "Enter": {
          e.preventDefault();
          const selectedItem = filteredItems[highlightedIndex];
          if (selectedItem?.onSelect) {
            selectedItem.onSelect();
            setOpen(false);
          }
          break;
        }
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [highlightedIndex, filteredItems, setHighlightedIndex, setOpen],
  );

  // Handle search change and reset highlight
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setHighlightedIndex(0);
    },
    [setSearch, setHighlightedIndex],
  );

  return (
    <div
      className={`flex items-center gap-3 border-b px-4 py-3 ${className}`}
      data-slot="command-k-input-wrapper"
      style={style}
    >
      {startAddon ?? (
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
      )}
      <input
        className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        data-slot="command-k-input"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={search}
      />
      {endAddon}
    </div>
  );
}
