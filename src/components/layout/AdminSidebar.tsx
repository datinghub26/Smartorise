"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Megaphone,
  Gift,
  CheckSquare,
  ArrowRightLeft,
  Share2,
  Smartphone,
  PieChart,
  Wallet,
  ArrowDownCircle,
  CreditCard,
  BarChart3,
  ShieldAlert,
  Webhook,
  MousePointerClick,
  Layers,
  Activity,
  FileText,
  ShieldCheck,
  Bell,
  Mail,
  LifeBuoy,
  Send,
  Radio,
  Sliders,
  Banknote,
  DollarSign,
  Cpu,
  Globe,
  Wrench,
  Languages,
  Clock,
  BookOpen,
  FileCode,
  Lock,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from "lucide-react";
import { useApp } from "../../context/AppStateContext";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { campaigns, fraudAlerts, tickets, notifications, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const pendingCampaignsCount = campaigns.filter((c) => c.status === "Pending").length;
  const openFraudCount = 1962; // matching crawled stat
  const openTicketsCount = tickets.filter((t) => t.status === "Open").length;
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const navCategories = [
    {
      title: "MANAGEMENT",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Publishers", href: "/admin/publishers", icon: Briefcase },
        { label: "Advertisers", href: "/admin/advertisers", icon: Megaphone },
        { label: "Offers", href: "/admin/offers", icon: Gift },
        {
          label: "Campaigns",
          href: "/admin/campaign-approvals",
          icon: CheckSquare,
          badge: pendingCampaignsCount > 0 ? String(pendingCampaignsCount) : undefined,
          badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
        },
        { label: "Conversions", href: "/admin/conversions", icon: ArrowRightLeft },
        { label: "Providers", href: "/admin/providers", icon: Share2 },
        { label: "Apps", href: "/admin/apps", icon: Smartphone },
      ],
    },
    {
      title: "FINANCIAL",
      items: [
        { label: "Overview", href: "/admin/financial", icon: PieChart },
        { label: "Withdrawals", href: "/admin/financial/withdrawals", icon: Wallet },
        { label: "Deposits", href: "/admin/deposits", icon: ArrowDownCircle },
        { label: "Gateways", href: "/admin/payment-gateways", icon: CreditCard },
      ],
    },
    {
      title: "MONITORING",
      items: [
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        {
          label: "Fraud",
          href: "/admin/fraud",
          icon: ShieldAlert,
          badge: String(openFraudCount),
          badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30"
        },
        { label: "Callbacks", href: "/admin/callbacks", icon: Webhook },
        { label: "Clicks", href: "/admin/clicks", icon: MousePointerClick },
        { label: "Queue", href: "/admin/queue", icon: Layers },
        { label: "System Health", href: "/admin/health", icon: Activity },
        { label: "Logs", href: "/admin/logs", icon: FileText },
        { label: "Audit", href: "/admin/audit-logs", icon: ShieldCheck },
      ],
    },
    {
      title: "COMMUNICATION",
      items: [
        {
          label: "Notifications",
          href: "/admin/notifications",
          icon: Bell,
          badge: unreadNotifs > 0 ? String(unreadNotifs) : undefined,
          badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
        },
        { label: "Contacts", href: "/admin/contacts", icon: Mail },
        {
          label: "Tickets",
          href: "/admin/tickets",
          icon: LifeBuoy,
          badge: openTicketsCount > 0 ? String(openTicketsCount) : undefined,
          badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
        },
        { label: "Newsletter", href: "/admin/newsletter", icon: Send },
        { label: "Announcements", href: "/admin/announcements", icon: Radio },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { label: "General", href: "/admin/settings", icon: Sliders },
        { label: "Withdrawal", href: "/admin/settings/withdrawal", icon: Banknote },
        { label: "Payments", href: "/admin/settings/payments", icon: DollarSign },
        { label: "SDK", href: "/admin/settings/sdk", icon: Cpu },
        { label: "API", href: "/admin/settings/api", icon: Globe },
        { label: "Maintenance", href: "/admin/settings/maintenance", icon: Wrench },
        { label: "Localization", href: "/admin/settings/localization", icon: Languages },
        { label: "Cron", href: "/admin/settings/cron", icon: Clock },
        { label: "Docs", href: "/admin/documentation", icon: BookOpen },
        { label: "Pages", href: "/admin/pages", icon: FileCode },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Roles", href: "/admin/roles", icon: Lock },
        { label: "Staff", href: "/admin/staff", icon: UserCheck },
      ],
    },
  ];

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-white/10 bg-[#05080f]/95 backdrop-blur-2xl flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold tracking-tight text-white block">
                Smartorise
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                Admin Portal
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navCategories.map((category) => (
          <div key={category.title}>
            {!collapsed && (
              <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {category.title}
              </h4>
            )}
            <div className="space-y-1">
              {category.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || "bg-white/10 text-white border-white/20"}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse sidebar</span>
            </>
          )}
        </button>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
};
