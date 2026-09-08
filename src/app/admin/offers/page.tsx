"use client";
import React, { useState } from "react";
import { Search, Filter, Gift, Check, Play, Pause } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function OffersPage() {
  const { offers, updateOffer } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [providerFilter, setProviderFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = offers.filter((o) => {
    const mSearch = o.title.toLowerCase().includes(search.toLowerCase());
    const mStatus = statusFilter === "All" || o.status === statusFilter;
    const mProvider = providerFilter === "All" || o.provider === providerFilter;
    const mCategory = categoryFilter === "All" || o.category === categoryFilter;
    return mSearch && mStatus && mProvider && mCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Offers Management</h1>
        <p className="text-sm text-slate-400">Global offer inventory across direct & CPA partner networks</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">STATUS</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">PROVIDER</span>
          <select value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All Providers</option>
            <option value="BitLabs">BitLabs</option>
            <option value="Torox">Torox</option>
            <option value="Wannads">Wannads</option>
            <option value="CPALead">CPALead</option>
            <option value="AdGate">AdGate</option>
            <option value="Lootably">Lootably</option>
            <option value="AdGem">AdGem</option>
            <option value="OfferToro">OfferToro</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">CATEGORY</span>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All Categories</option>
            <option value="CPI">CPI</option>
            <option value="CPA">CPA</option>
            <option value="Survey">Survey</option>
          </select>
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Search offers..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-full rounded-xl border border-white/10 bg-slate-900 pl-9 pr-4 text-xs text-white" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">OFFER</th>
              <th className="py-3.5 px-4">PROVIDER</th>
              <th className="py-3.5 px-4">PAYOUT</th>
              <th className="py-3.5 px-4">REWARD</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={o.thumbnail} alt={o.title} className="h-9 w-9 rounded-xl object-cover border border-white/10" />
                    <div>
                      <span className="font-bold text-white block">{o.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{o.externalId}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4"><Badge variant="info">{o.provider}</Badge></td>
                <td className="py-3 px-4 font-bold text-emerald-400">${o.payout.toFixed(2)}</td>
                <td className="py-3 px-4 font-bold text-blue-400">${o.reward.toFixed(2)}</td>
                <td className="py-3 px-4"><Badge variant={o.status}>{o.status}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {o.status === "Pending" ? (
                      <button onClick={() => updateOffer(o.id, { status: "Active" })} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Approve</button>
                    ) : o.status === "Active" ? (
                      <button onClick={() => updateOffer(o.id, { status: "Paused" })} className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 font-semibold text-[11px]">Pause</button>
                    ) : (
                      <button onClick={() => updateOffer(o.id, { status: "Active" })} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Activate</button>
                    )}
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