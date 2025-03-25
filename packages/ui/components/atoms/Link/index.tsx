import React from "react";
import { VariantProps } from "tailwind-variants";
import { linkVariants } from "./index.variants";
import { cn } from "../../../utils";

type LinkProps = VariantProps<typeof linkVariants> & {
  className?: string;
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const Link = ({ className, variant, href, children, disabled = false, ...props }: LinkProps) => {
  const linkClasses = cn(
    linkVariants({ variant }),
    disabled && "pointer-events-none opacity-50",
    className
  );

  return (
    <a className={linkClasses} href={disabled ? "#" : href} aria-disabled={disabled} {...props}>
      {children}
    </a>
  );
};

export { Link, type LinkProps };
