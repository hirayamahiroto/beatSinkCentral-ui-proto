import React from "react";
import { Card as BaseCard } from "@ui/design-system/primitives/card";
import { VariantProps } from "tailwind-variants";
import { cardVariants } from "@ui/design-system/components/atoms/Card/index.variants";
import { cn } from "@ui/shared/utils/mergeClassNames";

type CardProps = React.ComponentProps<typeof BaseCard> &
  VariantProps<typeof cardVariants>;

const Card = ({ className, variant, ...props }: CardProps) => {
  return (
    <BaseCard className={cn(cardVariants({ variant }), className)} {...props} />
  );
};

export { Card, type CardProps };
