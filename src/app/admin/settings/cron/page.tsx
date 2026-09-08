"use client";
import React from "react";
import { Clock, Play } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";
import { Badge } from "../../../../components/ui/Badge";

export default function CronSettingsPage() {
  const { settings, runCronJob } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Cron Jobs</h1>
        <p className="text-sm text-slate-400">Scheduled server tasks, offer synchronization & queue flushers</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">JOB</th>
              <th className="py-3.5 px-4">COMMAND</th>
              <th className="py-3.5 px-4">SCHEDULE</th>
              <th className="py-3.5 px-4">LAST RUN</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {settings.cron.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{c.job}</td>
                <td className="py-3 px-4 font-mono text-blue-400">{c.command}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{c.schedule}</td>
                <td className="py-3 px-4 text-slate-400">{c.lastRun}</td>
                <td className="py-3 px-4"><Badge variant="active">{c.status}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => runCronJob(c.id)} className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 font-semibold text-[11px] inline-flex items-center gap-1.5">
                    <Play className="h-3 w-3" />
                    Run Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}