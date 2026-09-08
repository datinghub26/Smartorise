"use client";
import React, { useState } from "react";
import { FileText, Trash2, Search } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function LogsPage() {
  const { logs, cleanupLogs } = useApp();
  const [days, setDays] = useState(30);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Logs</h1>
          <p className="text-sm text-slate-400">Application log events, warnings, API requests & exceptions</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Keep last</span>
          <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-16 h-8 rounded-lg border border-white/10 bg-slate-900 px-2 text-xs text-white" />
          <span className="text-xs text-slate-400">days</span>
          <button onClick={() => cleanupLogs(days)} className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 font-semibold text-xs">Cleanup Old Logs</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">TYPE</th>
              <th className="py-3.5 px-4">LEVEL</th>
              <th className="py-3.5 px-4">MESSAGE</th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">IP</th>
              <th className="py-3.5 px-4">DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{l.type}</td>
                <td className="py-3 px-4"><Badge variant={l.level}>{l.level}</Badge></td>
                <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">{l.message}</td>
                <td className="py-3 px-4 text-slate-400">{l.user}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{l.ip}</td>
                <td className="py-3 px-4 text-slate-500">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}