import { Image as AtomImage } from "./index";
import ImageMock from "./index.mock";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AtomImage> = {
  title: "atoms/Image",
  component: AtomImage,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: ImageMock.src,
    alt: "Image",
  },
};
