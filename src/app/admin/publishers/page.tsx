"use client";
import React, { useState } from "react";
import { Search, ShieldCheck, Edit, Eye, XCircle } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function PublishersPage() {
  const { publishers, updatePublisher } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPub, setSelectedPub] = useState<any | null>(null);

  const filtered = publishers.filter((p) => {
    const matchSearch = p.company.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Publishers</h1>
        <p className="text-sm text-slate-400">Vetting, auditing & managing publisher networks and apps</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="TOTAL" value={publishers.length} />
        <StatCard label="VERIFIED" value={publishers.filter(p => p.status === "Verified").length} />
        <StatCard label="PENDING" value={publishers.filter(p => p.status === "Pending").length} />
        <StatCard label="REJECTED" value={publishers.filter(p => p.status === "Rejected").length} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">STATUS</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Company, name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-full rounded-xl border border-white/10 bg-slate-900 pl-9 pr-4 text-xs text-white" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">COMPANY</th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">APPS</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-blue-400">{p.code}</td>
                <td className="py-3 px-4 font-bold text-white">{p.company}</td>
                <td className="py-3 px-4 text-slate-400">{p.email}</td>
                <td className="py-3 px-4"><Badge variant={p.status}>{p.status}</Badge></td>
                <td className="py-3 px-4 font-semibold">{p.appsCount} apps</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedPub(p)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 font-semibold text-[11px]">View</button>
                    {p.status === "Verified" ? (
                      <button onClick={() => updatePublisher(p.id, { status: "Rejected" })} className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 font-semibold text-[11px]">Reject</button>
                    ) : (
                      <button onClick={() => updatePublisher(p.id, { status: "Verified" })} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 font-semibold text-[11px]">Verify</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPub && (
        <Modal isOpen={true} onClose={() => setSelectedPub(null)} title={`Publisher Details: ${selectedPub.company}`}>
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-400">ID Code:</span> <span className="text-white font-mono">{selectedPub.code}</span></div>
            <div><span className="text-slate-400">Contact Email:</span> <span className="text-white">{selectedPub.email}</span></div>
            <div><span className="text-slate-400">Status:</span> <Badge variant={selectedPub.status}>{selectedPub.status}</Badge></div>
            <div><span className="text-slate-400">Connected Applications:</span> <span className="text-white font-bold">{selectedPub.appsCount} Apps</span></div>
          </div>
        </Modal>
      )}
    </div>
  );
}