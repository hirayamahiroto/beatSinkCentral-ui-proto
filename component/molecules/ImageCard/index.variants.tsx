import { tv } from "tailwind-variants";

const cardVariants = tv({
  base: "rounded-xl border text-fg shadow-sm overflow-hidden w-[200px] h-[200px]",
  variants: {
    color: {
      default: "bg-white",
      black: "bg-black",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export { cardVariants };
