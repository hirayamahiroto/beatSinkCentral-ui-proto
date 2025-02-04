import React from "react";
import { Code, Youtube, Music, Mic, Github } from "lucide-react";
import Image from "next/image";

const PlayerProfile = () => {
  return (
    <div className="min-h-screen relative bg-black">
      {/* MV Section */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] bg-black opacity-50" />
          <Image
            src="/heroSlide3Pc.webp"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 ">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6">
            HIROTO
          </h1>
          <p className="text-xl text-gray-300 mb-12 tracking-wide">
            Beatboxer / Engineer / Creator
          </p>
          <div className="flex gap-6 mb-16">
            {["YouTube", "Twitter", "Instagram", "SoundCloud"].map((platform) => (
              <div key={platform} className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            ))}
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

      {/* Skills Section */}
      <div id="skills" className="container mx-auto px-4 py-20">
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

      {/* Latest Projects */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Latest Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="group relative overflow-hidden rounded-xl aspect-video">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Youtube className="w-12 h-12 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl aspect-video">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Github className="w-12 h-12 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
