"use client";
import React, { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";

export default function NewsletterPage() {
  const { subscribers, toggleSubscriber, deleteSubscriber, bulkDeactivateSubscribers, bulkDeleteSubscribers } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("deactivate");

  const handleApply = () => {
    if (bulkAction === "deactivate") bulkDeactivateSubscribers(selectedIds);
    else bulkDeleteSubscribers(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Newsletter Subscribers</h1>
        <p className="text-sm text-slate-400">Marketing subscriber lists, opt-in records & bulk broadcasts</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Subscribers" value={subscribers.length} />
        <StatCard label="Active" value={subscribers.filter(s => s.status === "Active").length} />
        <StatCard label="Unsubscribed" value={subscribers.filter(s => s.status === "Unsubscribed").length} />
        <StatCard label="Today" value="0" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex items-center gap-3">
        <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
          <option value="deactivate">Deactivate</option>
          <option value="delete">Delete</option>
        </select>
        <button disabled={selectedIds.length === 0} onClick={handleApply} className="px-4 py-2 rounded-xl bg-blue-500/15 text-blue-400 font-semibold text-xs disabled:opacity-40">Apply</button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4 w-10"></th>
              <th className="py-3.5 px-4">NAME</th>
              <th className="py-3.5 px-4">EMAIL</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">SOURCE</th>
              <th className="py-3.5 px-4">SUBSCRIBED</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <input type="checkbox" checked={selectedIds.includes(s.id)} onChange={() => setSelectedIds(prev => prev.includes(s.id) ? prev.filter(i => i !== s.id) : [...prev, s.id])} className="rounded bg-slate-900 border-slate-700 text-blue-500" />
                </td>
                <td className="py-3 px-4 font-bold text-white">{s.name}</td>
                <td className="py-3 px-4 text-slate-400">{s.email}</td>
                <td className="py-3 px-4"><Badge variant={s.status}>{s.status}</Badge></td>
                <td className="py-3 px-4">{s.source}</td>
                <td className="py-3 px-4 text-slate-500">{s.subscribedDate}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => toggleSubscriber(s.id)} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-semibold">{s.status === "Active" ? "Deactivate" : "Activate"}</button>
                    <button onClick={() => deleteSubscriber(s.id)} className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /></button>
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