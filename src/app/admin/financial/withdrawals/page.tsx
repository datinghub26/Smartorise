"use client";
import React, { useState } from "react";
import { Wallet, Search, CheckCircle, XCircle } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";
import { StatCard } from "../../../../components/ui/StatCard";
import { Badge } from "../../../../components/ui/Badge";

export default function WithdrawalsPage() {
  const { withdrawals, approveWithdrawal, rejectWithdrawal, bulkApproveWithdrawals, bulkRejectWithdrawals } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = withdrawals.filter((w) => {
    const mSearch = w.user.toLowerCase().includes(search.toLowerCase());
    const mStatus = statusFilter === "All" || w.status === statusFilter;
    const mMethod = methodFilter === "All" || w.method === methodFilter;
    return mSearch && mStatus && mMethod;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(filtered.map(w => w.id));
    else setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Withdrawal Management</h1>
        <p className="text-sm text-slate-400">Review, audit & process cashout payouts across PayPal, Crypto & Bank Wire</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="PENDING" value="$0.00" subtext="0 requests" />
        <StatCard label="APPROVED TODAY" value="$0.00" subtext="0 processed" />
        <StatCard label="THIS WEEK" value="$0.00" subtext="Total payouts" />
        <StatCard label="AVG. AMOUNT" value="$0.00" subtext="Per withdrawal" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
            <input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0} onChange={(e) => handleSelectAll(e.target.checked)} className="rounded bg-slate-900 border-slate-700 text-blue-500" />
            Select All
          </label>
          <button disabled={selectedIds.length === 0} onClick={() => { bulkApproveWithdrawals(selectedIds); setSelectedIds([]); }} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-semibold text-xs transition disabled:opacity-40">Bulk Approve</button>
          <button disabled={selectedIds.length === 0} onClick={() => { bulkRejectWithdrawals(selectedIds); setSelectedIds([]); }} className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 font-semibold text-xs transition disabled:opacity-40">Bulk Reject</button>
        </div>

        <div className="flex items-center gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Processed">Processed</option>
          </select>
          <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white">
            <option value="All">All Methods</option>
            <option value="PayPal">PayPal</option>
            <option value="Crypto">Crypto</option>
            <option value="Bank">Bank</option>
            <option value="Payoneer">Payoneer</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4 w-10"></th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">AMOUNT</th>
              <th className="py-3.5 px-4">METHOD</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((w) => (
              <tr key={w.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <input type="checkbox" checked={selectedIds.includes(w.id)} onChange={() => setSelectedIds(prev => prev.includes(w.id) ? prev.filter(i => i !== w.id) : [...prev, w.id])} className="rounded bg-slate-900 border-slate-700 text-blue-500" />
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-white block">{w.user}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{w.accountDetails}</span>
                </td>
                <td className="py-3 px-4 font-bold text-emerald-400">${w.amount.toFixed(2)}</td>
                <td className="py-3 px-4"><Badge variant="info">{w.method}</Badge></td>
                <td className="py-3 px-4"><Badge variant={w.status}>{w.status}</Badge></td>
                <td className="py-3 px-4 text-slate-500">{w.date}</td>
                <td className="py-3 px-4 text-right">
                  {w.status === "Pending" && (
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => approveWithdrawal(w.id)} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Approve</button>
                      <button onClick={() => rejectWithdrawal(w.id)} className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 font-semibold text-[11px]">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}