import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "./index.module.css";
import { cn } from "./../../../libs";
type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const Image = ({ src, alt, className }: ImageProps) => {
  return <LazyLoadImage src={src} alt={alt} className={cn(classes.image, className)} />;
};

export { Image };
