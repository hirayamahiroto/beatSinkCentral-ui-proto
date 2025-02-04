import Image from "next/image";
import { Calendar, MapPin, Users, Clock, Search, Filter, ArrowRight } from "lucide-react";

const EVENTS_DATA = [
  {
    id: 1,
    title: "Beatbox Championship 2024",
    date: "2024.03.21",
    type: "大会",
    location: "東京都渋谷区",
    participants: 128,
    description:
      "日本一のビートボクサーを決める年に一度の大会。優勝者は世界大会への切符を手にします。",
    image: "/heroSlide3Pc.webp",
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
    image: "/heroSlide3Pc.webp",
  },
  {
    id: 3,
    title: "Beatbox Workshop 2024",
    date: "2024.05.01",
    type: "ワークショップ",
    location: "大阪",
    participants: 20,
    description: "初心者から中級者向けのワークショップ。基礎テクニックを学びます。",
    image: "/heroSlide3Pc.webp",
  },
  {
    id: 4,
    title: "Beatbox Workshop 2024",
    date: "2024.05.01",
    type: "ワークショップ",
    location: "大阪",
    image: "/heroSlide3Pc.webp",
    participants: 20,
  },

  {
    id: 5,
    title: "Beatbox Workshop 2024",
    date: "2024.05.01",
    type: "ワークショップ",
    location: "大阪",
    image: "/heroSlide3Pc.webp",
    participants: 20,
  },

  {
    id: 6,
    title: "Beatbox Workshop 2024",
    date: "2024.05.01",
    type: "ワークショップ",
    location: "大阪",
    image: "/heroSlide3Pc.webp",
    participants: 20,
  },

  {
    id: 7,
    title: "Beatbox Workshop 2024",
    date: "2024.05.01",
    type: "ワークショップ",
    location: "大阪",
    image: "/heroSlide3Pc.webp",
    participants: 20,
  },
];

const EventSchedule = () => {
  const featuredEvent = EVENTS_DATA.find((event) => event.isFeatured);
  const regularEvents = EVENTS_DATA.filter((event) => !event.isFeatured);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                width={1200}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Featured</span>
                    <span className="text-gray-300">{featuredEvent.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{featuredEvent.title}</h2>
                  <div className="flex items-center gap-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>参加者: {featuredEvent.participants}名</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Event List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all"
              >
                <div className="relative aspect-video">
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">{event.date}</span>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{event.participants}名</span>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventSchedule;
