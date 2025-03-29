import React from "react";
import { Card as BaseCard } from "../../../primitives/card";
import { VariantProps } from "tailwind-variants";
import { cardVariants } from "./index.variants";
import { cn } from "../../..//../utils";

type CardProps = React.ComponentProps<typeof BaseCard> & VariantProps<typeof cardVariants>;

const Card = ({ className, variant, ...props }: CardProps) => {
  return <BaseCard className={cn(cardVariants({ variant }), className)} {...props} />;
};

export { Card, type CardProps };
