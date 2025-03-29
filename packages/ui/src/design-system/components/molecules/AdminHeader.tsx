"use client";
import React from "react";
import { Link as AtomLink } from "../atoms/Link";
import { usePathname } from "next/navigation";
import { cn } from "../../../shared/utils/mergeClassNames";
import { LayoutDashboard, CalendarPlus, List, Calendar } from "lucide-react";

const AdminHeader = () => {
  const pathname = usePathname();

  const navigation = [
    {
      name: "ダッシュボード",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "イベント一覧",
      href: "/admin/list",
      icon: List,
    },
    {
      name: "イベント登録",
      href: "/admin/register",
      icon: CalendarPlus,
    },
    {
      name: "カレンダー",
      href: "/admin/calendar",
      icon: Calendar,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <AtomLink href="/admin/list" className="text-xl font-bold text-white">
              Event Admin
            </AtomLink>
            <nav className="flex items-center space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <AtomLink
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </AtomLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
