import { Card as MantineCard } from "@mantine/core";
import classes from "./index.module.css";
import { cn } from "./../../../libs";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return <MantineCard className={cn(classes.card, className)}>{children}</MantineCard>;
};

export { Card };
