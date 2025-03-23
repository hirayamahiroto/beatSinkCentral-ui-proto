"use client";
import React, { useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { Users, Calendar, Clock, MapPin, Search, Check } from "lucide-react";
import { cn } from "../../../utils";
import AdminHeader from "./../../../components/AdminHeader";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive";
    size?: "default" | "sm";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "destructive" &&
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-8 px-3 text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Card Components
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

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// Tabs Components
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-white/5 p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Progress Component
const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// Types
interface EventData {
  name: string;
  date: string;
  capacity: number;
  entries: number;
  waitlist: number;
  location: string;
  startTime: string;
  endTime: string;
}

type ParticipantStatus = "confirmed" | "waiting" | "cancelled";

interface Participant {
  id: number;
  name: string;
  email: string;
  status: ParticipantStatus;
  registeredAt: string;
  isCheckedIn: boolean;
}

// 検索コンポーネント
const SearchInput = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="名前やメールで検索..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// チェックインボタン
const CheckInButton = ({
  participantId,
  isCheckedIn,
  onCheckIn,
}: {
  participantId: number;
  isCheckedIn: boolean;
  onCheckIn: (id: number) => void;
}) => {
  return (
    <button
      onClick={() => onCheckIn(participantId)}
      className={cn(
        "px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2",
        isCheckedIn
          ? "bg-green-500/20 text-green-400"
          : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
      )}
    >
      <Check className="w-4 h-4" />
      {isCheckedIn ? "チェックイン済み" : "チェックイン"}
    </button>
  );
};

// 参加者リスト
const ParticipantList = ({
  participants,
  onCheckIn,
  onStatusChange,
  showStatusChange = false,
}: {
  participants: Participant[];
  onCheckIn: (id: number) => void;
  onStatusChange: (id: number, status: ParticipantStatus) => void;
  showStatusChange?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchInput onSearch={setSearchQuery} />
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
        {filteredParticipants.map((participant) => (
          <div
            key={participant.id}
            className="group relative overflow-hidden rounded-xl bg-white/5 p-6 transition-all hover:bg-white/10"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
            <div className="relative flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-white">{participant.name}</p>
                <p className="text-sm text-gray-400">{participant.email}</p>
                <p className="text-xs text-gray-500">登録日: {participant.registeredAt}</p>
              </div>
              <div className="flex items-center gap-3">
                {participant.status === "confirmed" && (
                  <CheckInButton
                    participantId={participant.id}
                    isCheckedIn={participant.isCheckedIn}
                    onCheckIn={onCheckIn}
                  />
                )}
                {showStatusChange && (
                  <button
                    onClick={() => onStatusChange(participant.id, "confirmed")}
                    className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-full transition-all"
                  >
                    確定する
                  </button>
                )}
                {(!participant.isCheckedIn || participant.status === "waiting") && (
                  <button
                    onClick={() => onStatusChange(participant.id, "cancelled")}
                    className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full transition-all"
                  >
                    キャンセル
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Event Management Component
const EventManagement = () => {
  const [eventData, setEventData] = React.useState<EventData>({
    name: "Beatbox Battle 2025",
    date: "2025-04-01",
    capacity: 100,
    entries: 100,
    waitlist: 15,
    location: "渋谷区文化センター",
    startTime: "13:00",
    endTime: "18:00",
  });

  const [confirmedParticipants, setConfirmedParticipants] = React.useState<Participant[]>([
    {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      status: "confirmed",
      registeredAt: "2024-03-15",
      isCheckedIn: false,
    },
    {
      id: 2,
      name: "山田花子",
      email: "yamada@example.com",
      status: "confirmed",
      registeredAt: "2024-03-16",
      isCheckedIn: true,
    },
    {
      id: 3,
      name: "佐藤健一",
      email: "sato.k@example.com",
      status: "confirmed",
      registeredAt: "2024-03-16",
      isCheckedIn: false,
    },
    {
      id: 4,
      name: "鈴木美咲",
      email: "suzuki.m@example.com",
      status: "confirmed",
      registeredAt: "2024-03-17",
      isCheckedIn: true,
    },
    {
      id: 5,
      name: "高橋誠",
      email: "takahashi@example.com",
      status: "confirmed",
      registeredAt: "2024-03-17",
      isCheckedIn: false,
    },
    {
      id: 6,
      name: "渡辺京子",
      email: "watanabe@example.com",
      status: "confirmed",
      registeredAt: "2024-03-18",
      isCheckedIn: false,
    },
    {
      id: 7,
      name: "伊藤さくら",
      email: "ito.s@example.com",
      status: "confirmed",
      registeredAt: "2024-03-18",
      isCheckedIn: true,
    },
    {
      id: 8,
      name: "小林大輔",
      email: "kobayashi@example.com",
      status: "confirmed",
      registeredAt: "2024-03-19",
      isCheckedIn: false,
    },
    {
      id: 9,
      name: "加藤美優",
      email: "kato.m@example.com",
      status: "confirmed",
      registeredAt: "2024-03-19",
      isCheckedIn: true,
    },
    {
      id: 10,
      name: "吉田隆",
      email: "yoshida@example.com",
      status: "confirmed",
      registeredAt: "2024-03-20",
      isCheckedIn: false,
    },
    {
      id: 11,
      name: "山本和也",
      email: "yamamoto@example.com",
      status: "confirmed",
      registeredAt: "2024-03-20",
      isCheckedIn: true,
    },
    {
      id: 12,
      name: "中村愛",
      email: "nakamura@example.com",
      status: "confirmed",
      registeredAt: "2024-03-21",
      isCheckedIn: false,
    },
    {
      id: 13,
      name: "林正樹",
      email: "hayashi@example.com",
      status: "confirmed",
      registeredAt: "2024-03-21",
      isCheckedIn: true,
    },
    {
      id: 14,
      name: "斎藤由美",
      email: "saito@example.com",
      status: "confirmed",
      registeredAt: "2024-03-22",
      isCheckedIn: false,
    },
    {
      id: 15,
      name: "池田太一",
      email: "ikeda@example.com",
      status: "confirmed",
      registeredAt: "2024-03-22",
      isCheckedIn: true,
    },
    {
      id: 16,
      name: "橋本真理",
      email: "hashimoto@example.com",
      status: "confirmed",
      registeredAt: "2024-03-23",
      isCheckedIn: false,
    },
    {
      id: 17,
      name: "山口恵子",
      email: "yamaguchi@example.com",
      status: "confirmed",
      registeredAt: "2024-03-23",
      isCheckedIn: true,
    },
    {
      id: 18,
      name: "松本龍太郎",
      email: "matsumoto@example.com",
      status: "confirmed",
      registeredAt: "2024-03-24",
      isCheckedIn: false,
    },
    {
      id: 19,
      name: "木村花",
      email: "kimura@example.com",
      status: "confirmed",
      registeredAt: "2024-03-24",
      isCheckedIn: true,
    },
    {
      id: 20,
      name: "井上智子",
      email: "inoue@example.com",
      status: "confirmed",
      registeredAt: "2024-03-25",
      isCheckedIn: false,
    },
  ]);

  const [waitlistParticipants, setWaitlistParticipants] = React.useState<Participant[]>([
    {
      id: 21,
      name: "清水翔太",
      email: "shimizu@example.com",
      status: "waiting",
      registeredAt: "2024-03-25",
      isCheckedIn: false,
    },
    {
      id: 22,
      name: "阿部真央",
      email: "abe@example.com",
      status: "waiting",
      registeredAt: "2024-03-26",
      isCheckedIn: false,
    },
    {
      id: 23,
      name: "野田優子",
      email: "noda@example.com",
      status: "waiting",
      registeredAt: "2024-03-26",
      isCheckedIn: false,
    },
    {
      id: 24,
      name: "藤田健一",
      email: "fujita@example.com",
      status: "waiting",
      registeredAt: "2024-03-27",
      isCheckedIn: false,
    },
    {
      id: 25,
      name: "岡田美咲",
      email: "okada@example.com",
      status: "waiting",
      registeredAt: "2024-03-27",
      isCheckedIn: false,
    },
    {
      id: 26,
      name: "後藤大輔",
      email: "goto@example.com",
      status: "waiting",
      registeredAt: "2024-03-28",
      isCheckedIn: false,
    },
    {
      id: 27,
      name: "中島裕子",
      email: "nakajima@example.com",
      status: "waiting",
      registeredAt: "2024-03-28",
      isCheckedIn: false,
    },
    {
      id: 28,
      name: "福田太郎",
      email: "fukuda@example.com",
      status: "waiting",
      registeredAt: "2024-03-29",
      isCheckedIn: false,
    },
    {
      id: 29,
      name: "原田さくら",
      email: "harada@example.com",
      status: "waiting",
      registeredAt: "2024-03-29",
      isCheckedIn: false,
    },
    {
      id: 30,
      name: "久保田誠",
      email: "kubota@example.com",
      status: "waiting",
      registeredAt: "2024-03-30",
      isCheckedIn: false,
    },
  ]);

  const handleStatusChange = (participantId: number, newStatus: ParticipantStatus) => {
    try {
      if (newStatus === "cancelled") {
        // 参加確定者のキャンセル処理
        const updatedConfirmedParticipants = confirmedParticipants.filter(
          (p) => p.id !== participantId
        );
        setConfirmedParticipants(updatedConfirmedParticipants);
        setEventData((prev) => ({
          ...prev,
          entries: prev.entries - 1,
        }));

        // キャンセル待ちのキャンセル処理
        const updatedWaitlistParticipants = waitlistParticipants.filter(
          (p) => p.id !== participantId
        );
        if (waitlistParticipants.length !== updatedWaitlistParticipants.length) {
          setWaitlistParticipants(updatedWaitlistParticipants);
          setEventData((prev) => ({
            ...prev,
            waitlist: prev.waitlist - 1,
          }));
        }
      } else if (newStatus === "confirmed") {
        // キャンセル待ちから参加確定への移動
        const participant = waitlistParticipants.find((p) => p.id === participantId);
        if (participant) {
          if (eventData.entries >= eventData.capacity) {
            alert("定員に達しているため、これ以上参加者を追加できません。");
            return;
          }
          const updatedParticipant = {
            ...participant,
            status: "confirmed" as ParticipantStatus,
          };
          setConfirmedParticipants([...confirmedParticipants, updatedParticipant]);
          setWaitlistParticipants(waitlistParticipants.filter((p) => p.id !== participantId));
          setEventData((prev) => ({
            ...prev,
            entries: prev.entries + 1,
            waitlist: prev.waitlist - 1,
          }));
        }
      }
    } catch (error) {
      console.error("Error updating participant status:", error);
    }
  };

  const handleCheckIn = (participantId: number) => {
    setConfirmedParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, isCheckedIn: !p.isCheckedIn } : p))
    );
  };

  // チェックイン済みの人数を計算
  const checkedInCount = confirmedParticipants.filter((p) => p.isCheckedIn).length;

  return (
    <div className="min-h-screen relative bg-black">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <Tabs defaultValue="details" className="space-y-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="details" className="text-lg px-6">
                イベント詳細
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="text-lg px-6">
                参加確定者 ({confirmedParticipants.length})
              </TabsTrigger>
              <TabsTrigger value="waitlist" className="text-lg px-6">
                キャンセル待ち ({waitlistParticipants.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>{eventData.name}</CardTitle>
                <CardDescription>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{eventData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {eventData.startTime} - {eventData.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{eventData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {eventData.entries}/{eventData.capacity}名
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">参加登録状況</p>
                    <Progress value={(eventData.entries / eventData.capacity) * 100} />
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/5 rounded-lg p-4 flex-1">
                      <p className="text-sm text-gray-400">参加確定</p>
                      <p className="text-2xl font-bold">{eventData.entries}名</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 flex-1">
                      <p className="text-sm text-gray-400">キャンセル待ち</p>
                      <p className="text-2xl font-bold">{eventData.waitlist}名</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 flex-1">
                      <p className="text-sm text-gray-400">チェックイン済み</p>
                      <p className="text-2xl font-bold">{checkedInCount}名</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmed">
            <div className="max-w-4xl mx-auto">
              <ParticipantList
                participants={confirmedParticipants}
                onCheckIn={handleCheckIn}
                onStatusChange={handleStatusChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="waitlist">
            <div className="max-w-4xl mx-auto">
              <ParticipantList
                participants={waitlistParticipants}
                onCheckIn={handleCheckIn}
                onStatusChange={handleStatusChange}
                showStatusChange={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventManagement;
