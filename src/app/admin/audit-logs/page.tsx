"use client";
import React from "react";
import { ShieldCheck } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function AuditLogsPage() {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Audit Trail</h1>
        <p className="text-sm text-slate-400">Security audit log tracking administrative modifications & approvals</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">TIME</th>
              <th className="py-3.5 px-4">LEVEL</th>
              <th className="py-3.5 px-4">CHANNEL</th>
              <th className="py-3.5 px-4">MESSAGE</th>
              <th className="py-3.5 px-4">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {auditLogs.map((a, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-slate-500">{a.time}</td>
                <td className="py-3 px-4"><Badge variant={a.level}>{a.level}</Badge></td>
                <td className="py-3 px-4 font-mono text-blue-400">{a.channel}</td>
                <td className="py-3 px-4 text-white font-medium">{a.message}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{a.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}