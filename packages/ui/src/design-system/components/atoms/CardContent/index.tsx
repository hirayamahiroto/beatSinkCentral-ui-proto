import React from "react";
import { CardContent as BaseCardContent } from "@ui/design-system/primitives/card";
import { VariantProps } from "tailwind-variants";
import { cardVariants } from "@ui/design-system/components/atoms/CardContent/index.variants";
import { cn } from "@ui/shared/utils/mergeClassNames";

type CardContentProps = React.ComponentProps<typeof BaseCardContent> &
  VariantProps<typeof cardVariants>;

const CardContent = ({ className, variant, ...props }: CardContentProps) => {
  return (
    <BaseCardContent
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
};

export { CardContent, type CardContentProps };
