"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCommandKContext } from "./context";
import type { CommandKItemProps } from "./types";

export function Item({
  children,
  value,
  keywords,
  onSelect,
  disabled = false,
  className = "",
  style,
}: CommandKItemProps): ReactNode {
  const {
    search,
    filter,
    registerItem,
    items,
    highlightedIndex,
    setHighlightedIndex,
    setOpen,
  } = useCommandKContext();
  const ref = useRef<HTMLDivElement>(null);

  // Register item on mount
  useEffect(() => {
    const unregister = registerItem({
      disabled,
      keywords,
      onSelect,
      ref,
      value,
    });
    return unregister;
  }, [value, keywords, disabled, onSelect, registerItem]);

  // Check if this item matches the filter
  const isVisible = useMemo(() => {
    if (disabled) return false;
    return filter(value, search) || keywords?.some((kw) => filter(kw, search));
  }, [value, keywords, search, filter, disabled]);

  // Get this item's index among visible items
  const visibleIndex = useMemo(() => {
    const visibleItems = items.filter(
      (item) =>
        !item.disabled &&
        (filter(item.value, search) ||
          item.keywords?.some((kw) => filter(kw, search))),
    );
    return visibleItems.findIndex((item) => item.value === value);
  }, [items, value, search, filter]);

  const isHighlighted = visibleIndex === highlightedIndex;

  // Handle click
  const handleClick = useCallback(() => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
  }, [disabled, onSelect, setOpen]);

  // Handle hover
  const handleMouseEnter = useCallback(() => {
    if (!disabled && visibleIndex >= 0) {
      setHighlightedIndex(visibleIndex);
    }
  }, [disabled, visibleIndex, setHighlightedIndex]);

  // Scroll into view when highlighted
  useEffect(() => {
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isHighlighted]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className={`relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
        isHighlighted
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-accent/50"
      } ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
      data-highlighted={isHighlighted}
      data-slot="command-k-item"
      data-value={value}
      initial={false}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      ref={ref}
      role="option"
      style={style}
    >
      {children}
    </motion.div>
  );
}
