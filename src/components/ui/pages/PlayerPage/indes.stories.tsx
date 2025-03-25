import type { Meta, StoryObj } from "@storybook/react";
import PlayerPage from "./index";

const meta = {
  title: "pages/PlayerPage",
  component: PlayerPage,
} satisfies Meta<typeof PlayerPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
