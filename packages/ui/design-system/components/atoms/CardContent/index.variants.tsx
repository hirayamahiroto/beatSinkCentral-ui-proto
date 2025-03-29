import { tv } from "tailwind-variants";

export const cardVariants = tv({
  base: [
    "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-(--card-spacing) has-[data-slot=card-action]:grid-cols-[1fr_auto]",
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
