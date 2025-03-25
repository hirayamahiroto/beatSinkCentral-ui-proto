export interface Event {
  id: number;
  title: string;
  date: string;
  type: "大会" | "ワークショップ" | "ショーケース" | "セミナー";
  location: string;
  participants: number;
  description?: string;
  image: string;
  isFeatured?: boolean;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Beatbox Championship 2024",
    date: "2024.03.21",
    type: "大会",
    location: "東京都渋谷区",
    participants: 128,
    description:
      "日本一のビートボクサーを決める年に一度の大会。優勝者は世界大会への切符を手にします。",
    image: "/image1.jpeg",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Regional Beatbox Battle",
    date: "2024.04.15",
    type: "大会",
    location: "横浜",
    participants: 32,
    description: "関東地区予選大会。優勝者は全国大会への切符を手にします。",
    image: "/image2.jpeg",
  },
  {
    id: 3,
    title: "Beatbox Workshop 2024",
    date: "2024.05.01",
    type: "ワークショップ",
    location: "大阪",
    participants: 20,
    description: "初心者から中級者向けのワークショップ。基礎テクニックを学びます。",
    image: "/image3.jpeg",
  },
  {
    id: 4,
    title: "Beatbox Showcase Night",
    date: "2024.05.15",
    type: "ショーケース",
    location: "名古屋",
    participants: 50,
    description:
      "トッププレイヤーによるショーケースイベント。最新のビートボックスシーンを体感できます。",
    image: "/image4.jpeg",
  },
  {
    id: 5,
    title: "Summer Beatbox Camp",
    date: "2024.07.01",
    type: "ワークショップ",
    location: "福岡",
    participants: 30,
    description: "3日間の集中ワークショップ。基礎から応用まで幅広く学べます。",
    image: "/image5.jpeg",
  },
  {
    id: 6,
    title: "Beatbox Theory Seminar",
    date: "2024.08.15",
    type: "セミナー",
    location: "札幌",
    participants: 40,
    description: "ビートボックスの理論と歴史を学ぶセミナー。",
    image: "/image6.jpeg",
  },
  {
    id: 7,
    title: "Underground Beatbox Battle",
    date: "2024.09.01",
    type: "大会",
    location: "神戸",
    participants: 64,
    description: "アンダーグラウンドシーンで注目の新進気鋭のビートボクサーたちによる熱い戦い。",
    image: "/image7.jpeg",
  },
];
