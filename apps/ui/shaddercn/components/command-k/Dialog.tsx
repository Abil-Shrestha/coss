"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCommandKContext } from "./context";
import type { CommandKDialogProps } from "./types";

export function Dialog({
  children,
  className = "",
  style,
}: CommandKDialogProps): ReactNode {
  const { open, setOpen, animationConfig } = useCommandKContext();
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  const { duration, scale, offsetY, backdropBlur, backdropOpacity } =
    animationConfig;

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setOpen(false);
      }
    },
    [setOpen],
  );

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // Animation variants
  const backdropVariants = {
    hidden: {
      backdropFilter: "blur(0px)",
      opacity: 0,
    },
    visible: {
      backdropFilter: prefersReducedMotion
        ? "blur(0px)"
        : `blur(${backdropBlur}px)`,
      opacity: 1,
    },
  };

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : scale,
      y: prefersReducedMotion ? 0 : -offsetY,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  const transition = {
    duration: prefersReducedMotion ? 0.1 : duration,
    ease: [0.32, 0.72, 0, 1] as const,
  };

  // Only render in browser
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          animate="visible"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
          exit="hidden"
          initial="hidden"
          onClick={handleBackdropClick}
          role="dialog"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
          }}
          transition={transition}
          variants={backdropVariants}
        >
          <motion.div
            animate="visible"
            className={`relative w-full max-w-xl overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-2xl ${className}`}
            exit="hidden"
            initial="hidden"
            onClick={(e) => e.stopPropagation()}
            ref={dialogRef}
            style={{
              ...style,
            }}
            transition={transition}
            variants={dialogVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
