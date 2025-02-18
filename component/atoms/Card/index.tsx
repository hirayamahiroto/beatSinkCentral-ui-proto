import { Card as MantineCard } from "@mantine/core";
import classes from "./index.module.css";
import { cn } from "./../../../libs";

type CardProps = {
  styled?: string;
  children: React.ReactNode;
};

const Card = ({ children, styled }: CardProps) => {
  return <MantineCard className={cn(classes.card, styled)}>{children}</MantineCard>;
};

export { Card };
