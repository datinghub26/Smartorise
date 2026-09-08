"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Coins, Gift, Trophy, Users, Shield, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppStateContext";

interface UserNavbarProps {
  activeTab: "earn" | "cashout" | "leaderboard" | "referrals";
  setActiveTab: (tab: "earn" | "cashout" | "leaderboard" | "referrals") => void;
}

export const UserNavbar: React.FC<UserNavbarProps> = ({ activeTab, setActiveTab }) => {
  const { settings, users } = useApp();

  const currentUser = users[0] || { balance: 1450, name: "Admin" };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05080f]/90 backdrop-blur-2xl">
      {/* Top Admin Switch Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border-b border-white/5 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <span className="text-slate-400 hidden sm:inline">
            You are viewing the <strong className="text-white">Public User-Facing Rewards Website</strong>
          </span>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 font-bold text-blue-400 hover:text-blue-300 transition mx-auto sm:mx-0"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Switch to Admin Panel →</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("earn")}>
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                {settings.general.platform_name || "Smartorise"}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mt-0.5">
                Offerwall & Rewards
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("earn")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "earn"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Earn Offers</span>
            </button>

            <button
              onClick={() => setActiveTab("cashout")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "cashout"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Gift className="h-4 w-4" />
              <span>Cashout Shop</span>
            </button>

            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "leaderboard"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={() => setActiveTab("referrals")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "referrals"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Affiliates (10%)</span>
            </button>
          </nav>
        </div>

        {/* User Balance & Switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Coins className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-extrabold text-white">
                {currentUser.balance.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">Coins</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold ml-1">
              (${(currentUser.balance / 1000).toFixed(2)})
            </span>
          </div>

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition shadow-lg"
          >
            <Shield className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">Admin Panel</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
