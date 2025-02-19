import ImageCard from "./index";
import ImageMock from "./index.mock";

import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ImageCard> = {
  title: "molecules/ImageCard",
  component: ImageCard,
  decorators: [],
};

export default meta;

type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {
  args: {
    src: ImageMock.src,
  },
};
