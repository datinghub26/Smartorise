"use client";
import React, { useState } from "react";
import { Share2, Search, RefreshCw, Power } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";

export default function ProvidersPage() {
  const { providers, updateProvider, showToast } = useApp();
  const [search, setSearch] = useState("");

  const filtered = providers.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Providers</h1>
        <p className="text-sm text-slate-400">Offerwall ad networks, S2S secret tokens & revenue share splits</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="ACTIVE PROVIDERS" value={providers.filter(p => p.status === "Active").length} />
        <StatCard label="TOTAL OFFERS" value="3094" />
        <StatCard label="ACTIVE OFFERS" value="3091" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">PROVIDER</th>
              <th className="py-3.5 px-4">CODE</th>
              <th className="py-3.5 px-4">POSTBACK URL</th>
              <th className="py-3.5 px-4">PAYOUT</th>
              <th className="py-3.5 px-4">OFFERS</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{p.name}</td>
                <td className="py-3 px-4 font-mono text-blue-400">{p.code}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500 max-w-xs truncate">{p.postbackUrl}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">{p.payoutShare}%</td>
                <td className="py-3 px-4 font-semibold">{p.offersCount}</td>
                <td className="py-3 px-4"><Badge variant={p.status}>{p.status}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => showToast(`Synced offers for ${p.name}`, 'success')} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">Sync</button>
                    <button onClick={() => updateProvider(p.id, { status: p.status === "Active" ? "Inactive" : "Active" })} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-semibold text-[11px]">Toggle</button>
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