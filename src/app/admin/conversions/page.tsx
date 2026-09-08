"use client";
import React, { useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function ConversionsPage() {
  const { conversions } = useApp();
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = conversions.filter((c) => statusFilter === "All" || c.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Conversions</h1>
        <p className="text-sm text-slate-400">Master conversion audit ledger, user reward crediting & network callbacks</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex items-center gap-4">
        <span className="text-xs font-semibold text-slate-400 uppercase">STATUS</span>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">TRANSACTION ID</th>
              <th className="py-3.5 px-4">OFFER</th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">PAYOUT</th>
              <th className="py-3.5 px-4">PROVIDER</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-blue-400 font-bold">{c.transactionId}</td>
                <td className="py-3 px-4 font-bold text-white">{c.offer}</td>
                <td className="py-3 px-4 text-slate-400">{c.user}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">${c.payout.toFixed(2)}</td>
                <td className="py-3 px-4"><Badge variant="info">{c.provider}</Badge></td>
                <td className="py-3 px-4"><Badge variant={c.status}>{c.status}</Badge></td>
                <td className="py-3 px-4 text-slate-500">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}