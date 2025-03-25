import type { Meta, StoryObj } from "@storybook/react";
import PrayersPage from "./index";

const meta = {
  title: "pages/PrayersPage",
  component: PrayersPage,
} satisfies Meta<typeof PrayersPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
