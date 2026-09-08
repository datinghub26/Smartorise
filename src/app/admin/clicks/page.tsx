"use client";
import React, { useState } from "react";
import { MousePointerClick, Search } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";

export default function ClicksPage() {
  const { clicks } = useApp();
  const [fraudFilter, setFraudFilter] = useState("All");

  const filtered = clicks.filter(c => fraudFilter === "All" || c.fraud === fraudFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Clicks Stream</h1>
        <p className="text-sm text-slate-400">Real-time offer click traffic, device fingerprints & fraud checks</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="TOTAL CLICKS" value={clicks.length} />
        <StatCard label="TODAY" value="0" />
        <StatCard label="BLOCKED (FRAUD)" value={clicks.filter(c => c.fraud === "Blocked").length} />
        <StatCard label="SUSPICIOUS" value={clicks.filter(c => c.fraud === "Suspicious").length} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex items-center gap-4">
        <span className="text-xs font-semibold text-slate-400 uppercase">FRAUD STATUS</span>
        <select value={fraudFilter} onChange={(e) => setFraudFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
          <option value="All">All Status</option>
          <option value="Clean">Clean</option>
          <option value="Suspicious">Suspicious</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">OFFER</th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">IP</th>
              <th className="py-3.5 px-4">COUNTRY</th>
              <th className="py-3.5 px-4">FRAUD</th>
              <th className="py-3.5 px-4">TIME</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((clk) => (
              <tr key={clk.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-blue-400">{clk.id}</td>
                <td className="py-3 px-4 font-bold text-white">{clk.offer}</td>
                <td className="py-3 px-4 text-slate-400">{clk.user}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{clk.ip}</td>
                <td className="py-3 px-4 font-bold">{clk.country}</td>
                <td className="py-3 px-4"><Badge variant={clk.fraud}>{clk.fraud}</Badge></td>
                <td className="py-3 px-4 text-slate-500">{clk.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}