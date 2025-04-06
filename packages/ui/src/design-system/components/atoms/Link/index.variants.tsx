import { tv } from "tailwind-variants";

export const linkVariants = tv({
  base: [
    "text-blue-500",
    "underline",
    "hover:text-blue-600",
    "pointer-events-auto",
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
