import { Dialog } from "./Dialog";
import { Empty } from "./Empty";
import { Footer } from "./Footer";
import { Group } from "./Group";
import { Input } from "./Input";
import { Item } from "./Item";
import { List } from "./List";
import { Root } from "./Root";
import { Separator } from "./Separator";
import { Shortcut, ShortcutGroup } from "./Shortcut";

// Compound component export (primary API)
export const CommandK = {
  Dialog,
  Empty,
  Footer,
  Group,
  Input,
  Item,
  List,
  Root,
  Separator,
  Shortcut,
  ShortcutGroup,
};

// Individual component exports
export {
  Root,
  Dialog,
  Input,
  List,
  Item,
  Group,
  Empty,
  Footer,
  Shortcut,
  ShortcutGroup,
  Separator,
};

// Hook exports (for advanced usage)
export { useCommandKContext } from "./context";

// Type exports
export type {
  CommandKAnimationConfig,
  CommandKContextValue,
  CommandKDialogProps,
  CommandKEmptyProps,
  CommandKFooterProps,
  CommandKGroupProps,
  CommandKInputProps,
  CommandKItemData,
  CommandKItemProps,
  CommandKListProps,
  CommandKRootProps,
  CommandKSeparatorProps,
  CommandKShortcutProps,
} from "./types";
