"use client";

import React from "react";
import { Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "../../../../libs";
import AdminHeader from "./../../../../component/AdminHeader";

// Card Component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Types
interface Event {
  id: number;
  name: string;
  date: string;
  capacity: number;
  entries: number;
  location: string;
  status: "upcoming" | "past";
}

const EventList = () => {
  const [events] = React.useState<Event[]>([
    {
      id: 1,
      name: "Beatbox Battle 2025",
      date: "2025-04-01",
      capacity: 100,
      entries: 75,
      location: "渋谷区文化センター",
      status: "upcoming",
    },
    {
      id: 2,
      name: "ビートボックスワークショップ",
      date: "2024-05-15",
      capacity: 30,
      entries: 25,
      location: "新宿区民センター",
      status: "upcoming",
    },
    {
      id: 3,
      name: "ストリートビートボックスバトル",
      date: "2024-03-30",
      capacity: 50,
      entries: 40,
      location: "代々木公園",
      status: "past",
    },
  ]);

  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "past");

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">イベント管理</h1>
            <Link
              href="/admin/register"
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg transition-colors"
            >
              新規イベント作成
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-blue-400 mb-4">開催予定のイベント</h2>
            <div className="grid gap-4">
              {upcomingEvents.map((event) => (
                <Link href={`/admin/detail?id=${event.id}`} key={event.id}>
                  <Card className="group relative overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">{event.name}</h2>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300">
                          開催予定
                        </span>
                      </div>
                      <div className="grid gap-2 text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.entries}/{event.capacity}名
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                          <span className="mr-2">詳細を見る</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-xl font-bold text-gray-400 mb-4">過去のイベント</h2>
            <div className="grid gap-4">
              {pastEvents.map((event) => (
                <Link href={`/admin/detail?id=${event.id}`} key={event.id}>
                  <Card className="group relative overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-500/20 rounded-full blur-3xl group-hover:bg-gray-500/30 transition-all duration-500" />
                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">{event.name}</h2>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-300">
                          終了
                        </span>
                      </div>
                      <div className="grid gap-2 text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.entries}/{event.capacity}名
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
                          <span className="mr-2">レポートを見る</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
