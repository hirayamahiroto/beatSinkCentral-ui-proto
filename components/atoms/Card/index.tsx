import { Card as BaseCard } from "@/components/base/card";
import { cardVariants, type CardVariantsProps } from "./index.styles";
import { ComponentProps } from "react";

type CardProps = ComponentProps<typeof BaseCard> &
  CardVariantsProps & {
    className?: string;
  };

const Card = ({ className, ...props }: CardProps) => {
  return <BaseCard className={cardVariants({ className })} {...props} />;
};

export { Card };
