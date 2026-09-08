"use client";
import React, { useState } from "react";
import { Smartphone, Key, Ban, Eye } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function AppsPage() {
  const { apps, updateApp, showToast } = useApp();
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Apps</h1>
        <p className="text-sm text-slate-400">Integrated publisher mobile apps, platforms & API secret keys</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Apps" value={apps.length} />
        <StatCard label="Active" value={apps.filter(a => a.status === "Active").length} />
        <StatCard label="Pending" value={apps.filter(a => a.status === "Pending").length} />
        <StatCard label="Suspended" value={apps.filter(a => a.status === "Suspended").length} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">App</th>
              <th className="py-3.5 px-4">Publisher</th>
              <th className="py-3.5 px-4">Platform</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Clicks</th>
              <th className="py-3.5 px-4">Conversions</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {apps.map((a) => (
              <tr key={a.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{a.title}</td>
                <td className="py-3 px-4 text-blue-400">{a.publisher}</td>
                <td className="py-3 px-4"><Badge variant="info">{a.platform}</Badge></td>
                <td className="py-3 px-4"><Badge variant={a.status}>{a.status}</Badge></td>
                <td className="py-3 px-4 font-mono">{a.clicks}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">{a.conversions}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedApp(a)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">View</button>
                    {a.status === "Active" ? (
                      <button onClick={() => updateApp(a.id, { status: "Suspended" })} className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 font-semibold text-[11px]">Suspend</button>
                    ) : (
                      <button onClick={() => updateApp(a.id, { status: "Active" })} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Activate</button>
                    )}
                    <button onClick={() => showToast(`Regenerated API keys for ${a.title}`, 'success')} className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-400 font-semibold text-[11px]">Regen Keys</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <Modal isOpen={true} onClose={() => setSelectedApp(null)} title={`App Details: ${selectedApp.title}`}>
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-400">App Secret Key:</span> <code className="text-emerald-400 font-mono block bg-black/40 p-2 rounded-lg mt-1">{selectedApp.appKey}</code></div>
            <div><span className="text-slate-400">Publisher:</span> <span className="text-white font-bold">{selectedApp.publisher}</span></div>
            <div><span className="text-slate-400">Platform:</span> <Badge variant="info">{selectedApp.platform}</Badge></div>
          </div>
        </Modal>
      )}
    </div>
  );
}