"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users, ArrowRight, Clock, ListTodo } from "lucide-react";
import { cn } from "../../../libs";
import AdminHeader from "../../../component/AdminHeader";

// Card Component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 text-card-foreground shadow-sm backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const AdminDashboard = () => {
  // サンプルデータ
  const stats = {
    totalEvents: 5,
    activeEvents: 3,
    totalParticipants: 245,
    upcomingEvents: 2,
  };

  const recentEvents = [
    {
      id: 1,
      name: "Beatbox Battle 2025",
      date: "2025-04-01",
      entries: 75,
      capacity: 100,
    },
    {
      id: 2,
      name: "ビートボックスワークショップ",
      date: "2024-05-15",
      entries: 25,
      capacity: 30,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* ウェルカムセクション */}
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-white mb-4">イベント管理システム</h1>
            <p className="text-gray-400">
              イベントの作成、参加者の管理、状況の確認をこちらから行えます
            </p>
          </div>

          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">総イベント数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Clock className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">開催中のイベント</p>
                  <p className="text-2xl font-bold text-white">{stats.activeEvents}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">総参加者数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalParticipants}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <ListTodo className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">開催予定</p>
                  <p className="text-2xl font-bold text-white">{stats.upcomingEvents}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* クイックアクション */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/register">
              <Card className="p-6 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">新規イベント作成</h3>
                    <p className="text-sm text-gray-400">新しいイベントを作成・公開する</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </Card>
            </Link>
            <Link href="/admin/list">
              <Card className="p-6 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">イベント一覧</h3>
                    <p className="text-sm text-gray-400">すべてのイベントを確認・管理する</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </Card>
            </Link>
          </div>

          {/* 最近のイベント */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">最近のイベント</h3>
                <Link
                  href="/admin/list"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  すべて表示
                </Link>
              </div>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <Link href={`/admin/detail?id=${event.id}`} key={event.id}>
                    <div className="group flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div>
                        <p className="font-medium text-white">{event.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Users className="h-4 w-4" />
                            <span>
                              {event.entries}/{event.capacity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
