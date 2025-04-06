import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeatSinkCentral - Beatfolio",
  description: "BeatSinkCentralは、日本のビートボックス業界のプロフェッショナル化と持続可能な構造の構築を目指しています。このプラットフォームは、プレイヤー、イベント主催者、観客を繋ぐ中心的なハブとして機能し、コミュニティ内の透明性、安全性、成長を促進します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
