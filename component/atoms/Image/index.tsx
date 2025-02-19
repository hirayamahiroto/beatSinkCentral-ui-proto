import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "./index.module.css";

type ImageProps = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: ImageProps) => {
  return <LazyLoadImage src={src} alt={alt} className={classes.image} />;
};

export { Image, type ImageProps };
