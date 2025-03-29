"use client";

import React, { useState } from "react";
import { Search, Filter, ArrowUpDown, Star, TrendingUp, Shuffle } from "lucide-react";
import { Link as AtomLink } from "../../atoms/Link";
import Header from "../../../../header";
import { players as playerData } from "../../../../data/players";
import { Image as AtomImage } from "../../atoms/Image";

const Card = ({ className = "", ...props }) => {
  return <div className={`rounded-lg shadow-lg overflow-hidden ${className}`} {...props}></div>;
};

const PlayersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterSpeciality, setFilterSpeciality] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"discover" | "search">("discover");
  const [randomPlayers, setRandomPlayers] = useState(playerData.slice(0, 4));

  const processedPlayers = playerData
    .filter((player) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        player.name.toLowerCase().includes(searchLower) ||
        player.realName.toLowerCase().includes(searchLower) ||
        player.team.toLowerCase().includes(searchLower);

      const matchesSpeciality = !filterSpeciality || player.speciality === filterSpeciality;
      return matchesSearch && matchesSpeciality;
    })
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleFilter = () => {
    const specialities = ["Aggressive", "Tactical"];
    const currentIndex = specialities.indexOf(filterSpeciality || "");
    setFilterSpeciality(
      currentIndex === specialities.length - 1 ? null : specialities[currentIndex + 1]
    );
  };

  const handleShuffle = () => {
    const shuffled = [...playerData].sort(() => Math.random() - 0.5).slice(0, 4);
    setRandomPlayers(shuffled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 ">
      <Header />

      {/* ヒーローセクション */}
      <div className="max-w-6xl mx-auto pt-[100px]">
        <div className="flex flex-col items-center text-center  md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Discover Beatbox Artists
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            From rising stars to established champions - explore the diverse world of beatbox
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSection("discover")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              activeSection === "discover"
                ? "bg-purple-600 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
            }`}
          >
            <Star className="w-4 h-4" />
            Discover
          </button>
          <button
            onClick={() => setActiveSection("search")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
              activeSection === "search"
                ? "bg-purple-600 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
            }`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Discoverセクション (受動的ユーザー向け) */}
        {activeSection === "discover" && (
          <div className="space-y-12 p-4 md:p-8">
            {/* 注目のプレイヤー */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-400" />
                  Featured Players
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playerData.slice(0, 3).map((player) => (
                  <AtomLink href={`/player`} key={player.id}>
                    <Card className="bg-black/40 backdrop-blur-lg border-0 overflow-hidden group cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black opacity-70" />
                        <AtomImage
                          src={player.image}
                          alt={player.name}
                          width={500}
                          height={300}
                          className="w-full h-[300px] object-cover filter brightness-75 saturate-50 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold">
                            {player.rank}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-purple-400/80 text-sm tracking-widest uppercase">
                                {player.team}
                              </p>
                              <span className="text-gray-400 text-sm px-2 py-1 rounded-full bg-gray-800/50">
                                {player.speciality}
                              </span>
                            </div>
                            <h2 className="text-4xl font-bold text-white">{player.name}</h2>
                            <p className="text-gray-300/90">{player.realName}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AtomLink>
                ))}
              </div>
            </section>

            {/* 新規プレイヤー */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  New Players
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {playerData.slice(3, 7).map((player) => (
                  <AtomLink href={`/player`} key={player.id}>
                    <Card className="bg-black/40 backdrop-blur-lg border-0 overflow-hidden group cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black opacity-70" />
                        <AtomImage
                          src={player.image}
                          alt={player.name}
                          width={500}
                          height={300}
                          className="w-full h-[300px] object-cover filter brightness-75 saturate-50 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold">
                            {player.rank}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-purple-400/80 text-sm tracking-widest uppercase">
                                {player.team}
                              </p>
                              <span className="text-gray-400 text-sm px-2 py-1 rounded-full bg-gray-800/50">
                                {player.speciality}
                              </span>
                            </div>
                            <h2 className="text-4xl font-bold text-white">{player.name}</h2>
                            <p className="text-gray-300/90">{player.realName}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AtomLink>
                ))}
              </div>
            </section>

            {/* ランダム発見 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                  <Shuffle className="w-5 h-5 text-purple-400" />
                  Random Discoveries
                </h2>
                <button
                  onClick={handleShuffle}
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Shuffle
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {randomPlayers.map((player) => (
                  <AtomLink href={`/player`} key={player.id}>
                    <Card className="bg-black/40 backdrop-blur-lg border-0 overflow-hidden group cursor-pointer">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black opacity-70" />
                        <AtomImage
                          src={player.image}
                          alt={player.name}
                          width={500}
                          height={300}
                          className="w-full h-[300px] object-cover filter brightness-75 saturate-50 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold">
                            {player.rank}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-purple-400/80 text-sm tracking-widest uppercase">
                                {player.team}
                              </p>
                              <span className="text-gray-400 text-sm px-2 py-1 rounded-full bg-gray-800/50">
                                {player.speciality}
                              </span>
                            </div>
                            <h2 className="text-4xl font-bold text-white">{player.name}</h2>
                            <p className="text-gray-300/90">{player.realName}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AtomLink>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Searchセクション (能動的ユーザー向け) */}
        {activeSection === "search" && (
          <div className="p-4 md:p-8">
            {/* 検索とフィルター */}
            <div className="bg-black/50 backdrop-blur-lg rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <input
                    className="w-full pl-10 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 text-white"
                    onClick={handleFilter}
                  >
                    <Filter className="w-4 h-4" />
                    Style
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 text-white"
                    onClick={handleSort}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Sort
                  </button>
                </div>
                <div className="flex gap-4">
                  <select className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white">
                    <option value="">Region</option>
                    <option value="kanto">関東</option>
                    <option value="kansai">関西</option>
                    <option value="other">その他</option>
                  </select>
                  <select className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white">
                    <option value="">Experience</option>
                    <option value="beginner">初心者</option>
                    <option value="intermediate">中級者</option>
                    <option value="advanced">上級者</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 検索結果グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processedPlayers.map((player) => (
                <AtomLink href={`/player`} key={player.id}>
                  <Card className="bg-black/40 backdrop-blur-lg border-0 overflow-hidden group cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black opacity-70" />
                      <AtomImage
                        src={player.image}
                        alt={player.name}
                        width={500}
                        height={300}
                        className="w-full h-[300px] object-cover filter brightness-75 saturate-50 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold">
                          {player.rank}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <p className="text-purple-400/80 text-sm tracking-widest uppercase">
                              {player.team}
                            </p>
                            <span className="text-gray-400 text-sm px-2 py-1 rounded-full bg-gray-800/50">
                              {player.speciality}
                            </span>
                          </div>
                          <h2 className="text-4xl font-bold text-white">{player.name}</h2>
                          <p className="text-gray-300/90">{player.realName}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AtomLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
