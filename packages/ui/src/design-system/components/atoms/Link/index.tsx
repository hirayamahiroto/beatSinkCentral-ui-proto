import React from "react";
import { VariantProps } from "tailwind-variants";
import { linkVariants } from "@ui/design-system/components/atoms/Link/index.variants";
import { cn } from "@ui/shared/utils/mergeClassNames";

type LinkProps = VariantProps<typeof linkVariants> & {
  className?: string;
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const Link = ({
  className,
  variant,
  href,
  children,
  disabled = false,
  ...props
}: LinkProps) => {
  const linkClasses = cn(
    linkVariants({ variant }),
    disabled && "pointer-events-none opacity-50",
    className
  );

  return (
    <a
      className={linkClasses}
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </a>
  );
};

export { Link, type LinkProps };
