"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ArrowRightLeft,
  Users,
  Clock,
  Wallet,
  ShieldAlert,
  Briefcase,
  Smartphone,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";
import { useApp } from "../../../context/AppStateContext";

export default function DashboardPage() {
  const {
    users,
    campaigns,
    withdrawals,
    notifications,
    clicks,
    conversions,
    apps,
    publishers
  } = useApp();

  const pendingCampaigns = campaigns.filter((c) => c.status === "Pending");
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "Pending");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Welcome to the Smartorise Administration Command Center
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/campaign-approvals"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition"
          >
            <span>Review Queue ({pendingCampaigns.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 8 Core KPI Stat Cards (Matching Crawled Specifications) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="REVENUE"
          value="$0.00"
          subtext="+$0.00 today"
          trend="+0.0%"
          icon={DollarSign}
        />
        <StatCard
          label="CONVERSIONS"
          value={conversions.length}
          subtext="+0 today"
          trend="+0.0%"
          icon={ArrowRightLeft}
        />
        <StatCard
          label="USERS"
          value={users.length}
          subtext="0 active right now"
          icon={Users}
        />
        <StatCard
          label="PENDING"
          value={pendingCampaigns.length}
          subtext="Review queue"
          actionText="Review →"
          onAction={() => window.location.assign("/admin/campaign-approvals")}
          icon={Clock}
        />
        <StatCard
          label="WITHDRAWALS"
          value={pendingWithdrawals.length}
          subtext="All clear"
          icon={Wallet}
        />
        <StatCard
          label="FRAUD"
          value="0.00%"
          subtext="1962 open alerts"
          isNegative={true}
          trend="Action required"
          icon={ShieldAlert}
        />
        <StatCard
          label="PUBLISHERS"
          value={publishers.length}
          subtext="Registered entities"
          icon={Briefcase}
        />
        <StatCard
          label="APPS"
          value={apps.length}
          subtext="Active integrations"
          icon={Smartphone}
        />
      </div>

      {/* Two Column Grid: Notifications & Payment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications Feed */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0b1120]/75 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">Notifications</h3>
              <p className="text-xs text-slate-400">Real-time alerts and platform activity</p>
            </div>
            <Link
              href="/admin/notifications"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              View all ({notifications.length})
            </Link>
          </div>

          <div className="mt-4 divide-y divide-white/5">
            {notifications.slice(0, 4).map((notif) => (
              <div key={notif.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{notif.title}</span>
                    <Badge variant="info">{notif.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">{notif.message}</p>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{notif.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Financial Snapshot */}
        <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-6 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">Payment Overview</h3>
            <p className="text-xs text-slate-400">Cashflow & payout metrics</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Pending Withdrawals</span>
              <span className="text-sm font-bold text-white">$0.00</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Publisher Balances</span>
              <span className="text-sm font-bold text-emerald-400">$970.65</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Advertiser Pre-fund</span>
              <span className="text-sm font-bold text-blue-400">$1,450.00</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/financial"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <span>Detailed Financials</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white">Recent Clicks & Activity</h3>
            <p className="text-xs text-slate-400">Latest traffic stream across apps</p>
          </div>
          <Link
            href="/admin/clicks"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            View all clicks →
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Offer</th>
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">IP Address</th>
                <th className="pb-3 font-semibold">Country</th>
                <th className="pb-3 font-semibold">Fraud Verdict</th>
                <th className="pb-3 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {clicks.slice(0, 5).map((clk) => (
                <tr key={clk.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 font-medium text-white">{clk.offer}</td>
                  <td className="py-3 text-slate-400">{clk.user}</td>
                  <td className="py-3 font-mono text-[11px] text-slate-400">{clk.ip}</td>
                  <td className="py-3 font-bold">{clk.country}</td>
                  <td className="py-3">
                    <Badge variant={clk.fraud}>{clk.fraud}</Badge>
                  </td>
                  <td className="py-3 text-slate-500">{clk.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
