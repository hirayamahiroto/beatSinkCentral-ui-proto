import { Image as AtomImage } from "./../../atoms/Image";
import { Card as AtomCard } from "./../../atoms/Card";
import styles from "./index.module.css";
import { cn } from "./../../../libs";

type CardVariant = "player" | "news" | "profile";

type CardProps = {
  children?: React.ReactNode;
  image: string;
  variant?: CardVariant;
  className?: string;
};

const Card = ({ children, image, variant = "player", className }: CardProps) => {
  const cardClasses = {
    player: styles.cardPlayer,
    news: styles.cardNews,
    profile: styles.cardProfile,
  };

  const imageClasses = {
    player: styles.image,
    news: styles.imageNews,
    profile: styles.imageProfile,
  };

  const textClasses = {
    player: styles.text,
    news: styles.textNews,
    profile: styles.textProfile,
  };

  return (
    <AtomCard className={cn(cardClasses[variant], className)}>
      <AtomImage src={image} alt="Card image" className={imageClasses[variant]} />
      <div className={textClasses[variant]}>{children}</div>
    </AtomCard>
  );
};

export default Card;
