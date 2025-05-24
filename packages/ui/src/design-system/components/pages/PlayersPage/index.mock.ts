import image1 from "../../../../../.storybook/assets/images/image1.jpeg";
import image2 from "../../../../../.storybook/assets/images/image2.jpeg";
import image3 from "../../../../../.storybook/assets/images/image3.jpeg";
import image4 from "../../../../../.storybook/assets/images/image4.jpeg";
import image5 from "../../../../../.storybook/assets/images/image5.jpeg";
import image6 from "../../../../../.storybook/assets/images/image6.jpeg";

export type Player = {
  id: number;
  name: string;
  audioFile?: string;
  image: string;
};

export const players: Player[] = [
  {
    id: 1,
    name: "HIROTO",
    image: image1 as any,
    audioFile: "audio1.mp3",
  },
  {
    id: 2,
    name: "Kazuki",
    image: image2 as any,
    audioFile: "audio2.mp3",
  },
  {
    id: 3,
    name: "Yuto",
    image: image3 as any,
  },
  {
    id: 4,
    name: "Yuto",
    image: image4 as any,
  },
  {
    id: 5,
    name: "Yuto",
    image: image5 as any,
  },
  {
    id: 6,
    name: "Yuto",
    image: image6 as any,
  },
  {
    id: 7,
    name: "Yuto",
    image: image4 as any,
  },
];

export { image1, image2, image3, image4, image5, image6 };
