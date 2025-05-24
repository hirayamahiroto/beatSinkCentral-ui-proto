"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Users,
  Music,
  Code,
  Trophy,
  Calendar,
  ExternalLink,
} from "lucide-react";

type PlayerDetailProps = {
  playerData: {
    image: string;
    name: string;
    tagline: string;
    badges: { text: string; primary: boolean; icon: string }[];
    stats: { value: string; label: string }[];
    story: string;
    skills: { name: string; description: string }[];
    performance: {
      title: string;
      views: string;
      duration: string;
      image: string;
    }[];
    activities: {
      date: string;
      title: string;
      description: string;
    }[];
  };
};

function PlayerPage({ playerData }: PlayerDetailProps) {
  const [activeTab, setActiveTab] = useState("story");
  const [isFollowing, setIsFollowing] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(0);

  const soundSamples = [
    {
      title: "シグネチャーサウンド",
      description: "HIROTOのトレードマークテクニック",
    },
    { title: "ドラムンベース", description: "高速リズムパターン" },
    { title: "メロディック", description: "歌声とビートの融合" },
  ];

  const tabs = [
    { id: "story", label: "ストーリー" },
    { id: "skills", label: "スキル" },
    { id: "performance", label: "パフォーマンス" },
    { id: "activities", label: "活動＆実績" },
  ];

  const getIconForBadge = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      trophy: <Trophy className="w-4 h-4" />,
      code: <Code className="w-4 h-4" />,
      music: <Music className="w-4 h-4" />,
      users: <Users className="w-4 h-4" />,
    };
    return iconMap[iconName] || <Trophy className="w-4 h-4" />;
  };

  const WaveBar = ({ delay }: { delay: number }) => (
    <div
      className={`bg-purple-500 w-1 rounded-full ${isPlaying ? "animate-pulse" : ""}`}
      style={{
        height: isPlaying ? `${Math.random() * 60 + 20}%` : "10%",
        animationDelay: `${delay}s`,
        transition: "height 0.3s ease",
      }}
    />
  );

  const playSound = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSound = () => {
    setCurrentSound((prev) => (prev + 1) % soundSamples.length);
  };

  const prevSound = () => {
    setCurrentSound(
      (prev) => (prev - 1 + soundSamples.length) % soundSamples.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 w-full bg-black/70 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-purple-500">
              BeatboxCentral
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-white hover:text-purple-500 transition-colors"
              >
                ホーム
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-500 transition-colors"
              >
                プレイヤー
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-500 transition-colors"
              >
                イベント
              </a>
              <a
                href="#"
                className="text-white hover:text-purple-500 transition-colors"
              >
                コミュニティ
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative h-[80vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80">
          <img
            src={playerData.image}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row items-end gap-8 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {playerData.name}
              </h1>
              <p className="text-lg text-gray-300 mb-4">{playerData.tagline}</p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                {playerData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`px-4 py-1 rounded-full text-sm flex items-center gap-2 ${
                      badge.primary
                        ? "bg-purple-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {getIconForBadge(badge.icon)}
                    {badge.text}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {playerData.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-6 mx-auto max-w-5xl px-4">
        <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 shadow-2xl">
          <button
            onClick={playSound}
            className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors flex-shrink-0"
          >
            <Play className="w-5 h-5 text-white ml-0.5" />
          </button>

          <div className="flex-1">
            <div className="font-semibold">
              {soundSamples[currentSound].title}
            </div>
            <div className="text-sm text-gray-400">
              {soundSamples[currentSound].description}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 h-10 px-4">
            <div className=" md:flex items-center gap-1 h-10 px-4">
              {[...Array(20)].map((_, i) => (
                <WaveBar key={i} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="sticky top-20 bg-gray-900 py-4 mb-8 z-40">
          <div className="flex space-x-6 border-b border-gray-700 pb-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 whitespace-nowrap font-medium relative transition-colors ${
                  activeTab === tab.id
                    ? "text-purple-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "story" && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-500" />
              ビートボクサーとしての旅
            </h2>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 bg-gray-800 rounded-xl p-6">
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>{playerData.story}</p>
                </div>
              </div>
              <div className="w-full lg:w-80 h-96 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={playerData.image}
                  alt={`${playerData.name} at competition`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === "skills" && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Code className="w-6 h-6 text-purple-500" />
              スキル
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerData.skills.map((skill, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-500">
                      <Music className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{skill.name}</h3>
                      <p className="text-sm text-gray-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "performance" && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Play className="w-6 h-6 text-purple-500" />
              パフォーマンス
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playerData.performance.map((performance, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 bg-gray-700 overflow-hidden">
                    <img
                      src={performance.image}
                      alt={performance.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-16 bg-purple-500/80 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                      {performance.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">
                      {performance.title}
                    </h3>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <span>{performance.views} views</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "activities" && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-purple-500" />
              活動＆実績
            </h2>
            <div className="relative pl-8">
              <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-gray-700" />
              {playerData.activities.map((activity, index) => (
                <div key={index} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-7 w-3 h-3 bg-purple-500 rounded-full top-1.5" />
                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="text-sm text-gray-400 mb-2">
                      {activity.date}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-gray-300">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export { PlayerPage };
