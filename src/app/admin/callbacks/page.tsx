"use client";
import React, { useState } from "react";
import { Webhook, RefreshCw } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";

export default function CallbacksPage() {
  const { callbacks, retryCallback } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Publisher Callback Logs</h1>
        <p className="text-sm text-slate-400">Outbound postback delivery logs, retry attempts & HTTP statuses</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="TOTAL LOGS" value={callbacks.length} />
        <StatCard label="SUCCESS RATE" value="100%" />
        <StatCard label="DELIVERED" value={callbacks.filter(c => c.status === "Delivered").length} />
        <StatCard label="FAILED" value={callbacks.filter(c => c.status === "Failed").length} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">APP</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">HTTP</th>
              <th className="py-3.5 px-4">RETRIES</th>
              <th className="py-3.5 px-4">ERROR</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {callbacks.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-blue-400">{c.id}</td>
                <td className="py-3 px-4 font-bold text-white">{c.app}</td>
                <td className="py-3 px-4"><Badge variant={c.status}>{c.status}</Badge></td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-400">{c.http}</td>
                <td className="py-3 px-4">{c.retries}</td>
                <td className="py-3 px-4 text-slate-400">{c.error}</td>
                <td className="py-3 px-4 text-slate-500">{c.date}</td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => retryCallback(c.id)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">Resend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}