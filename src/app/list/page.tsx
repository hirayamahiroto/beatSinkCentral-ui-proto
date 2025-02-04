"use client";

import React, { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";
const Card = ({ className = "", ...props }) => {
  return <div className={`rounded-lg shadow-lg overflow-hidden ${className}`} {...props}></div>;
};

const PlayerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterSpeciality, setFilterSpeciality] = useState<string | null>(null);

  const players = [
    {
      id: 1,
      name: "HIROTO",
      realName: "HIROTO HIRAYAMA",
      age: 22,
      team: "Phoenix Squad",
      rank: "#1",
      speciality: "Aggressive",
      image: "/heroSlide3Pc.webp",
    },
    {
      id: 2,
      name: "HIROTO",
      realName: "HIROTO HIRAYAMA",
      age: 20,
      team: "Night Raiders",
      rank: "#2",
      speciality: "Tactical",
      image: "/heroSlide3Pc.webp",
    },
  ];

  // 検索、フィルター、ソート機能を統合
  const processedPlayers = players
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">Our Players</h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Meet the elite players who define the competitive gaming landscape
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-black/50 backdrop-blur-lg rounded-lg p-6 mb-12">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                className="pl-10 bg-gray-900/50 border-gray-800 text-white w-full"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="bg-purple-600 hover:bg-purple-700" onClick={handleSort}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Player Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {processedPlayers.map((player) => (
            <Link href={`/ui`} key={player.id}>
              <Card
                key={player.id}
                className="bg-black/40 backdrop-blur-lg border-0 overflow-hidden group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black opacity-70" />
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-[600px] object-cover filter brightness-75 saturate-50 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-6 right-6">
                    <span className="bg-purple-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold">
                      {player.rank}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex justify-between items-center">
                        <p className="text-purple-400/80 text-sm tracking-widest uppercase">
                          {player.team}
                        </p>
                        <span className="text-gray-400 text-sm px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm">
                          {player.speciality}
                        </span>
                      </div>
                      <h2 className="text-5xl font-bold text-white tracking-tight opacity-90">
                        {player.name}
                      </h2>
                      <div className="pt-2">
                        <p className="text-gray-300/90 text-lg font-light tracking-wider">
                          {player.realName}
                        </p>
                        <p className="text-purple-400/70 text-sm mt-1 tracking-wider">
                          {player.age}歳
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
