"use client";
import React, { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function NotificationsPage() {
  const { notifications, markAllNotificationsRead, markNotificationRead } = useApp();
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "System", "Payments", "Deposits", "Withdrawals", "Publishers", "Advertisers", "Campaigns", "Security", "Fraud"];
  const filtered = notifications.filter(n => selectedCat === "All" || n.category === selectedCat);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Notification Center</h1>
          <p className="text-sm text-slate-400">Platform triggers across payments, campaigns, security & users</p>
        </div>
        <button onClick={markAllNotificationsRead} className="px-4 py-2 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 text-xs font-semibold flex items-center gap-2">
          <CheckCheck className="h-4 w-4" />
          Mark All Read
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setSelectedCat(c)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedCat === c ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-6 backdrop-blur-xl shadow-2xl divide-y divide-white/5">
        {filtered.map((n) => (
          <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`py-4 flex items-start justify-between gap-4 cursor-pointer transition ${!n.isRead ? "bg-white/[0.02]" : ""}`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{n.title}</span>
                <Badge variant="info">{n.category}</Badge>
                {!n.isRead && <span className="h-2 w-2 rounded-full bg-blue-500" />}
              </div>
              <p className="text-xs text-slate-400">{n.message}</p>
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}