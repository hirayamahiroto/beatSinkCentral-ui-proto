import type { Meta, StoryObj } from "@storybook/react";
import { CardContent } from "./index";

const meta = {
  title: "atoms/CardContent",
  component: CardContent,
} satisfies Meta<typeof CardContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};
