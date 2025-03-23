import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";

const meta = {
  title: "Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-96 h-96",
    variant: "default",
  },
};
