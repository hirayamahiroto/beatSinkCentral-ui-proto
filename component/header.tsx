"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-white">Beat Sink Central</div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              ホーム
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              運営情報
            </Link>
            <Link href="/playerList" className="text-gray-300 hover:text-white transition-colors">
              プレイヤー
            </Link>
            <Link href="/event" className="text-gray-300 hover:text-white transition-colors">
              イベント
            </Link>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors">
              ログイン
            </button>
          </nav>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                ホーム
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                運営情報
              </Link>
              <Link
                href="/playerList"
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                プレイヤー
              </Link>
              <Link
                href="/event"
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                イベント
              </Link>

              <hr className="border-white/10" />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors w-full">
                ログイン
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
