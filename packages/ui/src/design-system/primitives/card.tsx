import React from "react";
import { twMerge } from "tailwind-merge";

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div data-slot="card" className={className} {...props} />;
};

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const CardHeader = ({ className, ...props }: HeaderProps) => (
  <div data-slot="card-header" className={className} {...props} />
);

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={twMerge(
        "font-semibold text-lg leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
};

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      data-slot="card-description"
      className={twMerge(
        "row-start-2 text-pretty text-muted-fg text-sm",
        className
      )}
      {...props}
    />
  );
};

const CardAction = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-action"
      className={twMerge(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
};

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-content"
      className={twMerge(
        "px-(--card-spacing) has-[[data-slot=table-header]]:bg-muted/40 has-[table]:p-0 group-has-[table]/card:border-t **:data-[slot=table-cell]:px-(--card-spacing) **:data-[slot=table-column]:px-(--card-spacing) [&:has(table)+[data-slot=card-footer]]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  );
};

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-footer"
      className={twMerge(
        "flex items-center px-(--card-spacing) [.border-t]:pt-6",
        className
      )}
      {...props}
    />
  );
};

Card.Content = CardContent;
Card.Description = CardDescription;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Action = CardAction;

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
};
