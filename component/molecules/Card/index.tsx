import { Card as AtomCard } from "./../../atoms/Card";
import { Image as AtomImage } from "./../../atoms/Image";
import classes from "./index.module.css";
import { cn } from "./../../../libs";

type CardVariant = "player" | "news" | "profile";

type CardProps = {
  children?: React.ReactNode;
  image: string;
  variant?: CardVariant;
};

const Card = ({ children, image, variant = "player" }: CardProps) => {
  const getCardClass = () => {
    switch (variant) {
      case "news":
        return classes.newsCard;
      case "profile":
        return classes.profileCard;
      default:
        return classes.playerCard;
    }
  };

  const getImageClass = () => {
    switch (variant) {
      case "news":
        return cn(classes.image, classes.newsImage);
      case "profile":
        return cn(classes.image, classes.profileImage);
      default:
        return classes.image;
    }
  };

  const getTextClass = () => {
    switch (variant) {
      case "news":
        return cn(classes.text, classes.newsText);
      case "profile":
        return cn(classes.text, classes.profileText);
      default:
        return classes.text;
    }
  };

  return (
    <AtomCard styled={cn(classes.card, getCardClass())}>
      <AtomImage src={image} alt="Image" className={getImageClass()} />
      {children}
      <div className={getTextClass()}>HIROTO</div>
    </AtomCard>
  );
};

export default Card;
