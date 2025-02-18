import Card from "./index";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "atoms/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ width: "fit-content", minWidth: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div style={{ width: "300px", height: "300px" }}>Card</div>
      </>
    ),
  },
};
