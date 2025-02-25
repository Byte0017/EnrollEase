import React from "react";

// Tooltip Provider Component
const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>; // This can be replaced with a context provider if needed
};

// Tooltip Trigger Component
const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({
  children,
  asChild = false,
}) => {
  const Tag = asChild ? React.Fragment : "button";
  return <Tag>{children}</Tag>;
};

// Tooltip Content Component
const TooltipContent: React.FC<{ side?: "top" | "right" | "bottom" | "left"; className?: string }> = ({
  children,
  side = "top",
  className,
}) => {
  const positionStyles = {
    top: "bottom-full mb-2",
    right: "left-full ml-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
  };

  return (
    <div
      className={`absolute z-50 bg-gray-800 text-white px-3 py-2 rounded-md text-sm shadow-lg ${
        positionStyles[side]
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

// Tooltip Component
const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

// Export all components
export { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider };