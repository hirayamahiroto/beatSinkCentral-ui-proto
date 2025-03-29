import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: [
    "group/card",
    "flex flex-col",
    "gap-(--card-spacing)",
    "rounded-lg border",
    "bg-bg py-(--card-spacing)",
    "text-fg shadow-xs",
    "[--card-spacing:theme(spacing.6)]",
    "has-[table]:overflow-hidden",
    "**:data-[slot=table-header]:bg-muted/50",
    "has-[table]:**:data-[slot=card-footer]:border-t",
    "**:[table]:overflow-hidden",
  ],
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
