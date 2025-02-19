import { Card as BaseCard } from "./../../justid/card";
import { cardVariants } from "./index.variants";

const { default: root } = cardVariants();

type CardProps = {
  className?: string;
};

const Card = ({ className, ...props }: CardProps) => {
  return <BaseCard className={root({ className })} {...props} />;
};

export default Card;
