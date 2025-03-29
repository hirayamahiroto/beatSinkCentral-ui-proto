"use client";
import React, { useState } from "react";
import { Code, Music, Mic, Youtube, Twitter, Instagram } from "lucide-react";
import { Image as AtomImage } from "../../atoms/Image";
import Header from "../../../../header";

const PlayerPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            {/* Introduction Section */}
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-4xl mx-auto bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative w-48 h-48">
                    <AtomImage
                      src="/image1.jpeg"
                      alt="Hiroto Profile"
                      className="object-cover rounded-full border-4 border-purple-500/30"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-4">HIROTO</h2>
                    <p className="text-xl text-gray-300 mb-6">
                      世界チャンピオンビートボクサー / エンジニア / クリエイター
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                        Beatbox
                      </span>
                      <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                        Programming
                      </span>
                      <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm">
                        Music Production
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div id="skills" className="container mx-auto px-4 pb-20">
              <h2 className="text-3xl font-bold text-white text-center mb-12">スキル & 経験</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 p-6 transition-all duration-500 hover:bg-white/10">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
                    <Mic className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Beatboxer</h3>
                    <p className="text-gray-400">Multiple championship titles</p>
                    <ul className="mt-4 space-y-2">
                      <li className="text-sm text-gray-500">• Grand Beatbox Battle Champion</li>
                      <li className="text-sm text-gray-500">• Asia Beatbox Championship</li>
                    </ul>
                  </div>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 p-6 transition-all duration-500 hover:bg-white/10">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
                    <Code className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Engineer</h3>
                    <p className="text-gray-400">Full-stack developer</p>
                    <ul className="mt-4 space-y-2">
                      <li className="text-sm text-gray-500">• Web Application Development</li>
                      <li className="text-sm text-gray-500">• Audio Processing</li>
                    </ul>
                  </div>
                </div>

                <div className="group">
                  <div className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 p-6 transition-all duration-500 hover:bg-white/10">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-500" />
                    <Music className="w-8 h-8 text-pink-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Producer</h3>
                    <p className="text-gray-400">Music & Video Creation</p>
                    <ul className="mt-4 space-y-2">
                      <li className="text-sm text-gray-500">• Original Music Production</li>
                      <li className="text-sm text-gray-500">• Video Content Creation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="container mx-auto px-4 pb-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                  <div className="text-gray-400">大会優勝</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-gray-400">制作楽曲</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-pink-400 mb-2">100K+</div>
                  <div className="text-gray-400">総視聴回数</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-green-400 mb-2">5+</div>
                  <div className="text-gray-400">開発アプリ</div>
                </div>
              </div>
            </div>

            {/* Latest Projects */}
            <div className="container mx-auto px-4 pb-20">
              <h2 className="text-3xl font-bold text-white text-center mb-8 sm:mb-12">
                最新プロジェクト
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
                <div className="group relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-video bg-white/5 backdrop-blur-sm">
                  <AtomImage
                    src="/image1.jpeg"
                    alt="Latest Performance"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                        最新パフォーマンス
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">GBB 2023 世界大会優勝</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-video bg-white/5 backdrop-blur-sm">
                  <AtomImage
                    src="/image2.jpeg"
                    alt="Latest Music"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                        最新楽曲
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">オリジナル楽曲「FLOW」</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-video bg-white/5 backdrop-blur-sm">
                  <AtomImage
                    src="/image3.jpeg"
                    alt="Latest App"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                        最新アプリ
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">ビートボックス練習アプリ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "Records":
        return (
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">戦績</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">2023</h3>
                <ul className="space-y-3">
                  <li className="text-gray-300">• Grand Beatbox Battle World Champion</li>
                  <li className="text-gray-300">• Asia Beatbox Championship Winner</li>
                </ul>
              </div>
              {/* 他の年の戦績も同様に追加可能 */}
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Contact</h2>
            <div className="max-w-2xl mx-auto bg-white/5 rounded-xl p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input type="text" className="w-full bg-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input type="email" className="w-full bg-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea className="w-full bg-white/10 rounded-lg p-3 text-white h-32"></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative bg-black">
      <Header />
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] bg-black opacity-50" />
          <AtomImage
            src="/image1.jpeg"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <div className="absolute bottom-32 right-8 flex flex-col items-end">
            <div className="flex gap-4 mb-4">
              <a
                href="https://youtube.com/@your-channel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/@your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1DA1F2] hover:text-[#1DA1F2]/80 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/@your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              HIROTO
            </h1>
            <span className="text-xl text-gray-300 tracking-wide mt-2">
              Beatboxer / Engineer / Creator
            </span>
          </div>
          <button className="animate-bounce cursor-pointer bg-transparent border border-white/20 rounded-full p-3 hover:bg-white/10 transition-colors duration-300">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-sm border-b border-white/10 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            {["profile", "Records", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-lg transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default PlayerPage;
