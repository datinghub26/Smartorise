"use client";
import React, { useState } from "react";
import { ShieldAlert, Search, CheckCircle, XCircle } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function FraudPage() {
  const { fraudAlerts, resolveFraudAlert, dismissFraudAlert } = useApp();
  const [typeFilter, setTypeFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingAlert, setViewingAlert] = useState<any | null>(null);

  const filtered = fraudAlerts.filter((f) => {
    const mType = typeFilter === "All" || f.type === typeFilter;
    const mSev = severityFilter === "All" || f.severity === severityFilter;
    const mStat = statusFilter === "All" || f.status === statusFilter;
    return mType && mSev && mStat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Fraud Detection</h1>
        <p className="text-sm text-slate-400">Risk scoring engine, VPN/proxy shields & multiple account mitigations</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">TYPE</span>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All Types</option>
            <option value="Vpn proxy">Vpn proxy</option>
            <option value="Multi-account">Multi-account</option>
            <option value="Fast completion">Fast completion</option>
            <option value="Device spoof">Device spoof</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">SEVERITY</span>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">STATUS</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">TYPE</th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">IP</th>
              <th className="py-3.5 px-4">RISK</th>
              <th className="py-3.5 px-4">SEVERITY</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{f.type}</td>
                <td className="py-3 px-4 text-slate-400">{f.user}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{f.ip}</td>
                <td className="py-3 px-4 font-bold text-rose-400">{f.risk}/100</td>
                <td className="py-3 px-4"><Badge variant={f.severity}>{f.severity}</Badge></td>
                <td className="py-3 px-4"><Badge variant={f.status}>{f.status}</Badge></td>
                <td className="py-3 px-4 text-slate-500">{f.date}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setViewingAlert(f)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">View</button>
                    {f.status === "Open" && (
                      <button onClick={() => resolveFraudAlert(f.id)} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Resolve</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewingAlert && (
        <Modal isOpen={true} onClose={() => setViewingAlert(null)} title="Fraud Alert Snapshot">
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-400">Trigger:</span> <span className="text-white font-bold">{viewingAlert.type}</span></div>
            <div><span className="text-slate-400">Target IP:</span> <code className="text-rose-400 font-mono">{viewingAlert.ip}</code></div>
            <div><span className="text-slate-400">Calculated Risk:</span> <span className="text-rose-400 font-bold">{viewingAlert.risk}/100 ({viewingAlert.severity})</span></div>
            <div><span className="text-slate-400">Associated User:</span> <span className="text-white">{viewingAlert.user}</span></div>
          </div>
        </Modal>
      )}
    </div>
  );
}