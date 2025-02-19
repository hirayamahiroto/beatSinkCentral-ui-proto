import { Card as BaseCard } from "./../../justid/card";
import { cardVariants } from "./../../atoms/Card/index.variants";
import { Image, ImageProps } from "./../../atoms/Image";
import { cn } from "../../../libs";

type ImageCardProps = ImageProps & {
  className?: string;
  children: React.ReactNode;
  color?: "default" | "black";
};

const ImageCard = ({ className, children, src, alt, color, ...props }: ImageCardProps) => {
  return (
    <BaseCard.Content className={cn(cardVariants({ className, color }))} {...props}>
      <Image src={src} alt={alt} />
      {children}
    </BaseCard.Content>
  );
};

export default ImageCard;
