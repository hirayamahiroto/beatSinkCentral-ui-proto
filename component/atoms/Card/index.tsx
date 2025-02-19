import { Card as BaseCard } from "./../../justid/card";
import { cardVariants } from "./index.variants";
import { cn } from "../../../libs";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  color?: "default" | "black";
};

const Card = ({ className, children, color, ...props }: CardProps) => {
  return (
    <BaseCard.Content className={cn(cardVariants({ className, color }))} {...props}>
      {children}
    </BaseCard.Content>
  );
};

export default Card;
