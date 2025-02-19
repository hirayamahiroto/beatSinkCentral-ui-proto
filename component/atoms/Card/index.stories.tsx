import Card from "./index";

import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "atoms/Card",
  component: Card,
  decorators: [],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <div>Card</div>,
  },
};
