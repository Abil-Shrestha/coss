"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CommandKContext } from "./context";
import type {
  CommandKAnimationConfig,
  CommandKItemData,
  CommandKRootProps,
} from "./types";

const defaultAnimationConfig: Required<CommandKAnimationConfig> = {
  backdropBlur: 4,
  backdropOpacity: 0.5,
  duration: 0.2,
  offsetY: 20,
  scale: 0.98,
};

// Default filter function - case insensitive substring match
function defaultFilter(value: string, search: string): boolean {
  return value.toLowerCase().includes(search.toLowerCase());
}

export function Root({
  children,
  open: controlledOpen,
  onOpenChange,
  enableShortcut = true,
  additionalShortcut,
  closeOnEscape = true,
  animationConfig,
  filter = defaultFilter,
}: CommandKRootProps): ReactNode {
  // Controlled/uncontrolled state
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  // Search state
  const [search, setSearch] = useState("");

  // Highlighted item index
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Registered items
  const [items, setItems] = useState<CommandKItemData[]>([]);

  // Handle open state changes
  const handleSetOpen = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        // Reset search when closing
        setSearch("");
        setHighlightedIndex(0);
      }
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange],
  );

  // Register item function
  const registerItem = useCallback((item: CommandKItemData) => {
    setItems((prev) => [...prev, item]);
    // Return unregister function
    return () => {
      setItems((prev) => prev.filter((i) => i.value !== item.value));
    };
  }, []);

  // Keyboard shortcut handling
  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if target is an input element
      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        // Only allow Escape to close from within input
        if (e.key === "Escape" && open && closeOnEscape) {
          e.preventDefault();
          handleSetOpen(false);
        }
        return;
      }

      // Cmd+K / Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSetOpen(!open);
        return;
      }

      // Additional shortcut (e.g., "/")
      if (additionalShortcut && e.key === additionalShortcut) {
        e.preventDefault();
        handleSetOpen(true);
        return;
      }

      // Escape to close
      if (e.key === "Escape" && open && closeOnEscape) {
        e.preventDefault();
        handleSetOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enableShortcut, additionalShortcut, open, closeOnEscape, handleSetOpen]);

  // Merge animation config with defaults
  const mergedAnimationConfig = useMemo(
    () => ({
      ...defaultAnimationConfig,
      ...animationConfig,
    }),
    [animationConfig],
  );

  const contextValue = useMemo(
    () => ({
      animationConfig: mergedAnimationConfig,
      filter,
      highlightedIndex,
      items,
      open,
      registerItem,
      search,
      setHighlightedIndex,
      setOpen: handleSetOpen,
      setSearch,
    }),
    [
      open,
      handleSetOpen,
      search,
      highlightedIndex,
      items,
      registerItem,
      mergedAnimationConfig,
      filter,
    ],
  );

  return (
    <CommandKContext.Provider value={contextValue}>
      {children}
    </CommandKContext.Provider>
  );
}
