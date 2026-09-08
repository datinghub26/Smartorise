"use client";
import React from "react";
import { ArrowDownCircle } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function DepositsPage() {
  const { deposits } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Advertiser Deposits</h1>
        <p className="text-sm text-slate-400">Pre-funding deposit transactions & manual wire receipts</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">REFERENCE</th>
              <th className="py-3.5 px-4">ADVERTISER</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-4">METHOD</th>
              <th className="py-3.5 px-4">AMOUNT</th>
              <th className="py-3.5 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {deposits.map((d) => (
              <tr key={d.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-blue-400">{d.reference}</td>
                <td className="py-3 px-4 font-bold text-white">{d.advertiser}</td>
                <td className="py-3 px-4 text-slate-500">{d.date}</td>
                <td className="py-3 px-4 font-semibold">{d.method}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">${d.amount.toFixed(2)}</td>
                <td className="py-3 px-4"><Badge variant={d.status}>{d.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}