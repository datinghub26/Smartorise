"use client";
import React from "react";
import { Layers, RefreshCw, Trash2 } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";

export default function QueuePage() {
  const { queueJobs, retryQueueJob, deleteQueueJob, retryAllQueueJobs, flushAllQueueJobs } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Queue Monitor</h1>
          <p className="text-sm text-slate-400">Background job queue dispatcher, async tasks & failed jobs</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={retryAllQueueJobs} className="px-3 py-2 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 text-xs font-semibold">Retry All</button>
          <button onClick={flushAllQueueJobs} className="px-3 py-2 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 text-xs font-semibold">Flush All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Pending Jobs" value="0" />
        <StatCard label="Failed Jobs" value={queueJobs.length} />
        <StatCard label="Processing" value="0" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">CONNECTION</th>
              <th className="py-3.5 px-4">QUEUE</th>
              <th className="py-3.5 px-4">EXCEPTION</th>
              <th className="py-3.5 px-4">FAILED AT</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {queueJobs.map((j) => (
              <tr key={j.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-blue-400">{j.id}</td>
                <td className="py-3 px-4">{j.connection}</td>
                <td className="py-3 px-4 font-mono text-amber-400">{j.queue}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-rose-400 max-w-sm truncate">{j.exception}</td>
                <td className="py-3 px-4 text-slate-500">{j.failedAt}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => retryQueueJob(j.id)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">Retry</button>
                    <button onClick={() => deleteQueueJob(j.id)} className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}