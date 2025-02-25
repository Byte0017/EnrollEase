import React, { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/Common/button";
import * as DialogPrimitive from "@radix-ui/react-dialog"; // Base dialog primitives
import { cn } from "@/lib/utils"; // Utility for className merging (see below)

// Type Definitions
type SheetSide = "left" | "right" | "top" | "bottom";

interface SheetProps extends DialogPrimitive.DialogProps {
  side?: SheetSide;
  className?: string;
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

interface SheetContentProps {
  side?: SheetSide;
  children: ReactNode;
  className?: string;
}

interface SheetCloseProps {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

// Animation Variants for Different Sides
const sheetVariants = {
  left: {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  },
  right: {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  },
  top: {
    open: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { y: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  },
  bottom: {
    open: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  },
};

const overlayVariants = {
  visible: { opacity: 0.5, transition: { duration: 0.2 } },
  hidden: { opacity: 0, transition: { duration: 0.2 } },
};

// Sheet Component (Root)
const Sheet: React.FC<SheetProps> = ({ side = "right", className, children, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      {children}
    </DialogPrimitive.Root>
  );
};

// SheetTrigger Component
const SheetTrigger: React.FC<SheetTriggerProps> = ({ asChild, children, className }) => (
  <DialogPrimitive.Trigger asChild={asChild} className={cn(className)}>
    {children}
  </DialogPrimitive.Trigger>
);

// SheetContent Component
const SheetContent: React.FC<SheetContentProps> = ({
  side = "right",
  children,
  className,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation (Escape key to close)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        contentRef.current?.closest("[data-radix-dialog]")?.querySelector("button[data-radix-close]")?.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <DialogPrimitive.Portal>
      <AnimatePresence>
        <DialogPrimitive.Overlay asChild>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        </DialogPrimitive.Overlay>
        <DialogPrimitive.Content asChild>
          <motion.div
            ref={contentRef}
            className={cn(
              "fixed z-50 bg-white shadow-xl",
              side === "left" && "top-0 left-0 h-full w-72 rounded-r-lg",
              side === "right" && "top-0 right-0 h-full w-72 rounded-l-lg",
              side === "top" && "top-0 left-0 right-0 w-full h-64 rounded-b-lg",
              side === "bottom" && "bottom-0 left-0 right-0 w-full h-64 rounded-t-lg",
              className
            )}
            variants={sheetVariants[side]}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </DialogPrimitive.Content>
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
};

// SheetClose Component
const SheetClose: React.FC<SheetCloseProps> = ({ asChild, children, className }) => (
  <DialogPrimitive.Close asChild={asChild} className={cn(className)}>
    {children}
  </DialogPrimitive.Close>
);

// Export Components
export { Sheet, SheetTrigger, SheetContent, SheetClose };