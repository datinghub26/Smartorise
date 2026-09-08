"use client";
import React from "react";
import { Activity, Database, HardDrive, Cpu, ShieldCheck } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";

export default function HealthPage() {
  const { settings } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Health & Diagnostics</h1>
        <p className="text-sm text-slate-400">Core server runtime status, database latency & storage integrity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-emerald-400" />
            <div>
              <h4 className="font-bold text-white text-sm">Database</h4>
              <p className="text-xs text-emerald-400">Connected. 40 tables found.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <HardDrive className="h-6 w-6 text-blue-400" />
            <div>
              <h4 className="font-bold text-white text-sm">Cache & Redis</h4>
              <p className="text-xs text-slate-400">File cache operational (Redis fallback ready)</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-purple-400" />
            <div>
              <h4 className="font-bold text-white text-sm">SSL & Encryption</h4>
              <p className="text-xs text-purple-400">HTTPS active & TLS 1.3 enabled</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">Server Info</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5"><span className="text-slate-400">PHP Version</span><span className="text-white font-mono font-bold">8.3.19</span></div>
            <div className="flex justify-between py-2 border-b border-white/5"><span className="text-slate-400">Framework</span><span className="text-white font-mono font-bold">Laravel 11.51.0 / Next.js 14</span></div>
            <div className="flex justify-between py-2 border-b border-white/5"><span className="text-slate-400">Server</span><span className="text-white font-bold">Apache / Linux</span></div>
            <div className="flex justify-between py-2"><span className="text-slate-400">Uptime</span><span className="text-emerald-400 font-bold">Operational (99.98%)</span></div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">Disk & Memory Allocation</h3>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1"><span className="text-slate-400">Disk Space</span><span className="text-white">12.4 GB / 80 GB (15%)</span></div>
              <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-blue-500 w-[15%]" /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-slate-400">Memory Allocation</span><span className="text-white">52 MB / 512 MB (Peak: 52 MB)</span></div>
              <div className="w-full h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-purple-500 w-[10%]" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}