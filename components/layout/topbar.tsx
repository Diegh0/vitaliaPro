"use client";
import { cn } from "@/lib/utils";
import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/hooks/use-t";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const t = useT();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = t.topbar.notif.map((n, i) => ({
    id: i + 1,
    ...n,
    time: ["30m", "1h", "2h"][i],
    unread: i < 2,
  }));

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-14 border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-30 flex items-center px-4 gap-3">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm hidden sm:block">
        <Input
          placeholder={t.topbar.search}
          leftIcon={<Search size={14} />}
          className="h-8 bg-secondary/60 border-transparent focus:bg-card"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Language toggle */}
        <LanguageToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((v) => !v)}
            className="relative p-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-card" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-card border border-border/60 rounded-2xl card-shadow overflow-hidden z-50"
              >
                <div className="p-4 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{t.topbar.notifications}</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        {unreadCount} {t.topbar.newLabel}
                      </span>
                    )}
                  </div>
                </div>
                <div className="divide-y divide-border/40">
                  {notifications.map((n) => (
                    <div key={n.id} className={cn("p-4 hover:bg-secondary/40 transition-colors cursor-pointer", n.unread && "bg-primary/3")}>
                      <div className="flex items-start gap-3">
                        {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                        {!n.unread && <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-border/60">
                  <button className="text-xs text-primary font-medium hover:underline">{t.topbar.viewAll}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center cursor-pointer">
            <span className="text-white text-xs font-bold">CR</span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-foreground">Centro Ruiz</p>
            <p className="text-xs text-muted-foreground">{t.topbar.user}</p>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {showNotifications && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
      )}
    </header>
  );
}
