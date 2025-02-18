import { Card as AtomCard } from "./index";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AtomCard> = {
  title: "atoms/Card",
  component: AtomCard,
  decorators: [
    (Story) => (
      <div style={{ width: "fit-content", minWidth: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AtomCard>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div style={{ width: "300px", height: "300px" }}>Card</div>
      </>
    ),
  },
};
