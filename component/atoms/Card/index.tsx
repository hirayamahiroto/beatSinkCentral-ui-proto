import { Card as MantineCard } from "@mantine/core";
import classes from "./index.module.css";

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <MantineCard className={classes.card}>{children}</MantineCard>;
};

export default Card;
