"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Search,
  CheckCircle,
  ExternalLink,
  User,
  Shield,
  LogOut,
  X
} from "lucide-react";
import { useApp } from "../../context/AppStateContext";

export const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { notifications, markAllNotificationsRead, markNotificationRead, logout } = useApp();
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Breadcrumbs calculation
  const pathParts = pathname.split("/").filter(Boolean);
  const formattedTitle = pathParts[pathParts.length - 1]
    ? pathParts[pathParts.length - 1].replace(/-/g, " ").toUpperCase()
    : "DASHBOARD";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes("user")) router.push("/admin/users");
    else if (query.includes("camp")) router.push("/admin/campaign-approvals");
    else if (query.includes("offer")) router.push("/admin/offers");
    else if (query.includes("fraud")) router.push("/admin/fraud");
    else if (query.includes("with") || query.includes("payout")) router.push("/admin/financial/withdrawals");
    else if (query.includes("gate")) router.push("/admin/payment-gateways");
    else if (query.includes("sett")) router.push("/admin/settings");
    else router.push(`/admin/users?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#05080f]/80 px-6 backdrop-blur-xl">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase">Admin</span>
        <span className="text-slate-600">/</span>
        <h2 className="text-sm font-bold text-white tracking-wide">
          {formattedTitle}
        </h2>
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns, users, offers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-64 rounded-xl border border-white/10 bg-slate-900/60 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          />
        </form>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDrawer(!showNotifDrawer)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/50 text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-lg shadow-rose-500/50">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Slide-out Notification Drawer */}
          {showNotifDrawer && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#0b1120] p-4 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Notifications</h4>
                  <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    {unreadCount} new
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-blue-400 hover:text-blue-300 transition"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={() => setShowNotifDrawer(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-white/5 max-h-80 overflow-y-auto mt-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`py-3 px-2 rounded-xl transition cursor-pointer ${
                      !n.isRead ? "bg-white/5" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 text-center">
                <Link
                  href="/admin/notifications"
                  onClick={() => setShowNotifDrawer(false)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 p-1.5 hover:bg-white/5 transition"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-bold text-white shadow-md">
              A
            </div>
            <div className="hidden sm:block text-left pr-1">
              <span className="text-xs font-bold text-white block leading-tight">Admin</span>
              <span className="text-[10px] text-slate-400 block leading-tight">Super Admin</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-[#0b1120] p-2 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-xs font-bold text-white">Admin</p>
                <p className="text-[10px] text-slate-400 truncate">admin@admin.com</p>
              </div>
              <Link
                href="/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 rounded-xl hover:bg-white/5 transition"
              >
                <Shield className="h-4 w-4 text-blue-400" />
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                  router.push("/login");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 rounded-xl hover:bg-rose-500/10 transition text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
