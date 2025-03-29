import { tv } from "tailwind-variants";

export const imageVariants = tv({
  base: ["w-full h-full"],
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
