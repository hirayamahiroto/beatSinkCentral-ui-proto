import React from "react";
import { LazyLoadImage as BaseImage } from "react-lazy-load-image-component";
import { VariantProps } from "tailwind-variants";
import { imageVariants } from "@ui/design-system/components/atoms/Image/index.variants";
import { cn } from "@ui/shared/utils/mergeClassNames";

type ImageProps = React.ComponentProps<typeof BaseImage> &
  VariantProps<typeof imageVariants> & {
    src: string;
    alt?: string;
  };

const Image = ({ className, variant, src, alt, ...props }: ImageProps) => {
  return (
    <BaseImage
      className={cn(imageVariants({ variant }), className)}
      src={src}
      alt={alt || ""}
      {...props}
    />
  );
};
export { Image, type ImageProps };
