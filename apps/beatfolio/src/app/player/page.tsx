import {
  PlayerPage,
  PlayerDetailProps,
} from "@ui/design-system/components/pages/PlayerPage";

type SignatureSound = {
  title: string;
  description: string;
  audio?: string;
};

type Badge = {
  text: string;
  primary: boolean;
  icon: string;
};

type Stat = {
  value: string;
  label: string;
};

type Story = {
  tittle: string;
  description: string;
};

type Skill = {
  name: string;
  description: string;
};

type Performance = {
  title: string;
  views: string;
  duration: string;
  image: string;
};

type Activity = {
  date: string;
  title: string;
  description: string;
};

type PlayerData = {
  id: number;
  image: string;
  name: string;
  tagline: string;
  signatureSound?: SignatureSound;
  badges: Badge[];
  stats: Stat[];
  story: Story[];
  skills: Skill[];
  performance: Performance[];
  activities: Activity[];
};

const players: PlayerData[] = [];

type PlayerComponentProps = {
  id: number;
};

export default function Player({ id }: PlayerComponentProps) {
  const playerData = players.find((player) => player.id === id);

  if (!playerData) {
    return <div>Player not found</div>;
  }

  return <PlayerPage playerData={playerData} />;
}
