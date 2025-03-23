import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./index";

const meta = {
  title: "Link",
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/",
    variant: "default",
    children: "Link",
  },
};
