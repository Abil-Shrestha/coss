import type { CSSProperties, ReactNode } from "react";

// Animation configuration
export interface CommandKAnimationConfig {
  /** Duration for dialog enter/exit */
  duration?: number;
  /** Scale on enter/exit */
  scale?: number;
  /** Y offset on enter/exit */
  offsetY?: number;
  /** Backdrop blur amount */
  backdropBlur?: number;
  /** Backdrop opacity */
  backdropOpacity?: number;
}

// Root component props
export interface CommandKRootProps {
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Enable keyboard shortcut (Cmd+K / Ctrl+K) */
  enableShortcut?: boolean;
  /** Additional keyboard shortcut (e.g., "/") */
  additionalShortcut?: string;
  /** Close when clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Close when pressing Escape key */
  closeOnEscape?: boolean;
  /** Animation configuration */
  animationConfig?: CommandKAnimationConfig;
  /** Filter function for items */
  filter?: (value: string, search: string) => boolean;
}

// Dialog component props
export interface CommandKDialogProps {
  children: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Input component props
export interface CommandKInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
  /** Start icon/addon */
  startAddon?: ReactNode;
  /** End icon/addon */
  endAddon?: ReactNode;
  /** Autofocus on open */
  autoFocus?: boolean;
}

// List component props
export interface CommandKListProps {
  children: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
  /** Maximum height */
  maxHeight?: number | string;
}

// Item component props
export interface CommandKItemProps {
  children: ReactNode;
  /** Value for filtering */
  value: string;
  /** Keywords for filtering */
  keywords?: string[];
  /** Called when item is selected */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Group component props
export interface CommandKGroupProps {
  children: ReactNode;
  /** Group heading */
  heading?: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Empty state component props
export interface CommandKEmptyProps {
  children?: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Footer component props
export interface CommandKFooterProps {
  children: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Shortcut component props
export interface CommandKShortcutProps {
  children: ReactNode;
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Separator component props
export interface CommandKSeparatorProps {
  /** Additional class names */
  className?: string;
  /** Additional styles */
  style?: CSSProperties;
}

// Internal context state
export interface CommandKContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  items: CommandKItemData[];
  registerItem: (item: CommandKItemData) => () => void;
  animationConfig: Required<CommandKAnimationConfig>;
  filter: (value: string, search: string) => boolean;
}

// Internal item data for registration
export interface CommandKItemData {
  value: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}
