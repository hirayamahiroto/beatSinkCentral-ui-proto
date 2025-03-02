import { tv } from "tailwind-variants";

const cardVariants = tv({
  base: "w-full h-full bg-red-500 bg-bg rounded-xl xkd2 [&:has(table)_.ccvgs8x]:border-t [&:has(table)_.x32]:bg-tertiary [&:has(table)]:overflow-hidden border text-fg shadow-sm [&:has(.larhy3):not(:has(.yahnba))>.ccvgs8x]:pt-6 [&:has(.larhy3)]:overflow-hidden [&_table]:overflow-hidden",
});

type CardVariantsProps = Parameters<typeof cardVariants>;

export { cardVariants, type CardVariantsProps };
