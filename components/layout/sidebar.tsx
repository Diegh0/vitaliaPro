"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, Users, Activity, BarChart3,
  CreditCard, Settings, Heart, ChevronLeft, X, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/hooks/use-t";

const navIcons = [LayoutDashboard, Calendar, Users, Activity, BarChart3, CreditCard, UserCheck, Settings];
const navHrefs = [
  "/dashboard",
  "/dashboard/appointments",
  "/dashboard/patients",
  "/dashboard/treatments",
  "/dashboard/analytics",
  "/dashboard/billing",
  "/dashboard/team",
  "/dashboard/settings",
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

function NavItem({
  href, label, icon: Icon, isActive, collapsed
}: {
  href: string; label: string; icon: typeof LayoutDashboard; isActive: boolean; collapsed: boolean;
}) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group relative",
          isActive
            ? "bg-primary text-white shadow-sm shadow-primary/30"
            : "text-slate-400 hover:bg-white/8 hover:text-white",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon size={18} className="shrink-0" />
        {!collapsed && <span>{label}</span>}
        {isActive && !collapsed && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
        )}
        {collapsed && (
          <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
}

export function Sidebar({ isOpen = true, onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const t = useT();

  const navItems = [
    { href: navHrefs[0], label: t.sidebar.nav.overview, icon: navIcons[0] },
    { href: navHrefs[1], label: t.sidebar.nav.appointments, icon: navIcons[1] },
    { href: navHrefs[2], label: t.sidebar.nav.patients, icon: navIcons[2] },
    { href: navHrefs[3], label: t.sidebar.nav.treatments, icon: navIcons[3] },
    { href: navHrefs[4], label: t.sidebar.nav.analytics, icon: navIcons[4] },
    { href: navHrefs[5], label: t.sidebar.nav.billing, icon: navIcons[5] },
    { href: navHrefs[6], label: t.sidebar.nav.team, icon: navIcons[6] },
    { href: navHrefs[7], label: t.sidebar.nav.settings, icon: navIcons[7] },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-full z-50 flex flex-col overflow-hidden",
          "bg-[#0f172a] border-r border-white/6",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-200 lg:transition-none"
        )}
        style={{ minWidth: collapsed ? 68 : 240 }}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-2.5 border-b border-white/6 shrink-0",
          collapsed ? "px-3 py-4 justify-center" : "px-5 py-4"
        )}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shrink-0">
            <Heart size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-bold text-white text-sm">Vitalia</span>
              <span className="font-bold text-teal-400 text-sm"> Pro</span>
            </div>
          )}
          {onClose && (
            <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white lg:hidden">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {!collapsed && (
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
              {t.sidebar.menu}
            </p>
          )}
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={isActive(item.href)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* User profile at bottom */}
        <div className={cn(
          "border-t border-white/6 p-3 shrink-0",
          collapsed ? "flex justify-center" : ""
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">CR</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">Centro Vitalia</p>
                <p className="text-slate-400 text-xs truncate">admin@vitaliapro.com</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs font-bold">CV</span>
            </div>
          )}

          {/* Collapse toggle */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={cn(
                "hidden lg:flex items-center justify-center w-full mt-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors text-xs",
                collapsed && "w-8 h-8 mx-auto"
              )}
            >
              <ChevronLeft
                size={16}
                className={cn("transition-transform duration-200", collapsed && "rotate-180")}
              />
              {!collapsed && <span className="ml-1">{t.sidebar.collapse}</span>}
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
}
