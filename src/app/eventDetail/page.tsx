import Image from "next/image";
import { Calendar, MapPin, Users, Clock, Share2, Trophy, Ticket } from "lucide-react";

const EVENT_DATA = {
  id: 1,
  title: "Beatbox Championship 2024",
  date: "2024.03.21",
  time: "12:00 - 20:00",
  type: "大会",
  location: "東京都渋谷区",
  venue: "渋谷ストリームホール",
  participants: 128,
  description:
    "日本一のビートボクサーを決める年に一度の大会。優勝者は世界大会への切符を手にします。",
  image: "/heroSlide3Pc.webp",
  price: "5,000円",
  prizes: [
    { rank: "優勝", reward: "賞金50万円 + 世界大会出場権" },
    { rank: "準優勝", reward: "賞金30万円" },
    { rank: "3位", reward: "賞金10万円" },
  ],
  schedule: [
    { time: "12:00", content: "開場・受付開始" },
    { time: "13:00", content: "予選ラウンド開始" },
    { time: "16:00", content: "準決勝" },
    { time: "18:00", content: "決勝戦" },
    { time: "19:30", content: "表彰式" },
  ],
};

export default function EventDetail() {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <Image src={EVENT_DATA.image} alt={EVENT_DATA.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-blue-500 rounded-full text-sm mb-4">
                {EVENT_DATA.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{EVENT_DATA.title}</h1>
              <div className="flex flex-wrap gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{EVENT_DATA.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{EVENT_DATA.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{EVENT_DATA.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>参加者: {EVENT_DATA.participants}名</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">イベント詳細</h2>
              <p className="text-gray-300 leading-relaxed">{EVENT_DATA.description}</p>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-2xl font-bold mb-4">タイムスケジュール</h2>
              <div className="space-y-4">
                {EVENT_DATA.schedule.map((item, index) => (
                  <div key={index} className="flex gap-6 items-start p-4 bg-white/5 rounded-lg">
                    <span className="text-blue-400 font-mono">{item.time}</span>
                    <span className="text-gray-300">{item.content}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Prizes */}
            <section>
              <h2 className="text-2xl font-bold mb-4">賞金・賞品</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EVENT_DATA.prizes.map((prize, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                    <h3 className="font-bold mb-1">{prize.rank}</h3>
                    <p className="text-sm text-gray-400">{prize.reward}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-bold mb-4">参加チケット</h3>
                <p className="text-2xl font-bold text-blue-400 mb-4">{EVENT_DATA.price}</p>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-all">
                  チケットを購入
                </button>
                <button className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  シェアする
                </button>
              </div>

              <div className="p-6 bg-white/5 rounded-xl">
                <h3 className="text-xl font-bold mb-4">会場</h3>
                <p className="text-gray-300 mb-2">{EVENT_DATA.venue}</p>
                <p className="text-gray-400 text-sm">{EVENT_DATA.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
