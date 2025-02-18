import Card from "./index";
import mockImage from "./index.mock";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "molecules/Card",
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

export const PlayerCard: Story = {
  args: {
    image: mockImage.src,
    variant: "player",
  },
};

export const NewsCard: Story = {
  args: {
    image: mockImage.src,
    variant: "news",
    children: <h3>ニュースのタイトル</h3>,
  },
};

export const ProfileCard: Story = {
  args: {
    image: mockImage.src,
    variant: "profile",
    children: (
      <div>
        <h4>プロフィール情報</h4>
        <p>詳細情報</p>
      </div>
    ),
  },
};
