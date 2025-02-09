"use client";
import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { Users, Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "../../../../libs";
import AdminHeader from "./../../../../component/AdminHeader";
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
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    role="tablist"
    aria-orientation="horizontal"
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
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
}

// Main Event Management Component
const EventManagement = () => {
  const [eventData, setEventData] = React.useState<EventData>({
    name: "Beatbox Battle 2025",
    date: "2025-04-01",
    capacity: 100,
    entries: 75,
    waitlist: 15,
    location: "渋谷区文化センター",
    startTime: "13:00",
    endTime: "18:00",
  });

  const [participants, setParticipants] = React.useState<Participant[]>([
    {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      status: "confirmed",
      registeredAt: "2024-03-15",
    },
    {
      id: 2,
      name: "山田花子",
      email: "yamada@example.com",
      status: "confirmed",
      registeredAt: "2024-03-16",
    },
  ]);

  const [waitlist, setWaitlist] = React.useState<Participant[]>([
    {
      id: 3,
      name: "佐藤次郎",
      email: "sato@example.com",
      status: "waiting",
      registeredAt: "2024-03-17",
    },
    {
      id: 4,
      name: "鈴木美咲",
      email: "suzuki@example.com",
      status: "waiting",
      registeredAt: "2024-03-18",
    },
  ]);

  const handleStatusChange = (participantId: number, newStatus: ParticipantStatus) => {
    try {
      if (newStatus === "cancelled") {
        // 参加確定者のキャンセル処理
        const updatedParticipants = participants.filter((p) => p.id !== participantId);
        setParticipants(updatedParticipants);
        setEventData((prev) => ({
          ...prev,
          entries: prev.entries - 1,
        }));

        // キャンセル待ちのキャンセル処理
        const updatedWaitlist = waitlist.filter((p) => p.id !== participantId);
        if (waitlist.length !== updatedWaitlist.length) {
          setWaitlist(updatedWaitlist);
          setEventData((prev) => ({
            ...prev,
            waitlist: prev.waitlist - 1,
          }));
        }
      } else if (newStatus === "confirmed") {
        // キャンセル待ちから参加確定への移動
        const participant = waitlist.find((p) => p.id === participantId);
        if (participant && eventData.entries < eventData.capacity) {
          const updatedParticipant = {
            ...participant,
            status: "confirmed" as ParticipantStatus,
          };
          setParticipants([...participants, updatedParticipant]);
          setWaitlist(waitlist.filter((p) => p.id !== participantId));
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

  return (
    <div className="min-h-screen relative bg-black">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <div className="sticky top-0 bg-black/80 backdrop-blur-sm border-b border-white/10 z-10">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger
                    value="overview"
                    className="py-4 px-6 text-lg transition-colors data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-400 hover:text-white"
                  >
                    イベント概要
                  </TabsTrigger>
                  <TabsTrigger
                    value="entries"
                    className="py-4 px-6 text-lg transition-colors data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-gray-400 hover:text-white"
                  >
                    エントリー管理
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview">
                <div className="container mx-auto px-4 py-20">
                  <div className="max-w-4xl mx-auto bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                    <div className="grid gap-4">
                      <h2 className="text-4xl font-bold text-white mb-4">{eventData.name}</h2>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{eventData.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="h-4 w-4" />
                        <span>
                          {eventData.startTime} - {eventData.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4" />
                        <span>{eventData.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-4 w-4" />
                        <span>定員 {eventData.capacity}名</span>
                      </div>

                      <div className="mt-8">
                        <div className="flex justify-between mb-2 text-gray-300">
                          <span>エントリー状況</span>
                          <span>
                            {eventData.entries}/{eventData.capacity}
                          </span>
                        </div>
                        <Progress
                          value={(eventData.entries / eventData.capacity) * 100}
                          className="h-2 bg-white/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="entries">
                <div className="container mx-auto px-4 py-20">
                  <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-white mb-6">
                        参加確定者 ({eventData.entries}名)
                      </h3>
                      <div className="space-y-4">
                        {participants.map((participant) => (
                          <div
                            key={participant.id}
                            className="group relative overflow-hidden rounded-xl bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
                          >
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
                            <div className="relative flex items-center justify-between">
                              <div>
                                <p className="font-medium text-white">{participant.name}</p>
                                <p className="text-sm text-gray-400">{participant.email}</p>
                                <p className="text-xs text-gray-500">
                                  登録日: {participant.registeredAt}
                                </p>
                              </div>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="bg-red-500/20 hover:bg-red-500/30 text-white"
                                onClick={() => handleStatusChange(participant.id, "cancelled")}
                              >
                                キャンセル
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-white mb-6">
                        キャンセル待ち ({eventData.waitlist}名)
                      </h3>
                      <div className="space-y-4">
                        {waitlist.map((participant) => (
                          <div
                            key={participant.id}
                            className="group relative overflow-hidden rounded-xl bg-white/5 p-6 transition-all duration-300 hover:bg-white/10"
                          >
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
                            <div className="relative flex items-center justify-between">
                              <div>
                                <p className="font-medium text-white">{participant.name}</p>
                                <p className="text-sm text-gray-400">{participant.email}</p>
                                <p className="text-xs text-gray-500">
                                  登録日: {participant.registeredAt}
                                </p>
                              </div>
                              <div className="space-x-2">
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="bg-blue-500/20 hover:bg-blue-500/30 text-white"
                                  onClick={() => handleStatusChange(participant.id, "confirmed")}
                                >
                                  参加確定
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="bg-red-500/20 hover:bg-red-500/30 text-white"
                                  onClick={() => handleStatusChange(participant.id, "cancelled")}
                                >
                                  キャンセル
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
