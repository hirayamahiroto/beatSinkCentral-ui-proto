import Card from "./index";

import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "atoms/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {},
};
