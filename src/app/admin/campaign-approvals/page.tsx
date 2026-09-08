"use client";
import React, { useState } from "react";
import { CheckSquare, Search, CheckCircle2, XCircle, FileText, Check } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function CampaignApprovalsPage() {
  const { campaigns, approveCampaign, rejectCampaign, bulkApproveCampaigns, bulkRejectCampaigns } = useApp();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [approvingCamp, setApprovingCamp] = useState<any | null>(null);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectingCamp, setRejectingCamp] = useState<any | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const pendingCount = campaigns.filter((c) => c.status === "Pending").length;
  const approvedCount = campaigns.filter((c) => c.status === "Approved").length;
  const rejectedCount = campaigns.filter((c) => c.status === "Rejected").length;
  const pausedCount = campaigns.filter((c) => c.status === "Paused").length;

  const filtered = campaigns.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.advertiser.toLowerCase().includes(search.toLowerCase()));

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(filtered.map((c) => c.id));
    else setSelectedIds([]);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Campaign Approvals</h1>
        <p className="text-sm text-slate-400">Direct advertiser campaign review queue & daily budget limits</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="PENDING" value={pendingCount} />
        <StatCard label="APPROVED" value={approvedCount} />
        <StatCard label="REJECTED" value={rejectedCount} />
        <StatCard label="PAUSED" value={pausedCount} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
            <input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0} onChange={(e) => handleSelectAll(e.target.checked)} className="rounded bg-slate-900 border-slate-700 text-blue-500" />
            Select All
          </label>
          <button disabled={selectedIds.length === 0} onClick={() => { bulkApproveCampaigns(selectedIds); setSelectedIds([]); }} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-semibold text-xs transition disabled:opacity-40">Bulk Approve</button>
          <button disabled={selectedIds.length === 0} onClick={() => { bulkRejectCampaigns(selectedIds, "Batch policy compliance check"); setSelectedIds([]); }} className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 font-semibold text-xs transition disabled:opacity-40">Bulk Reject</button>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Search campaigns or advertisers..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-full rounded-xl border border-white/10 bg-slate-900 pl-9 pr-4 text-xs text-white" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4 w-10"></th>
              <th className="py-3.5 px-4">CAMPAIGN</th>
              <th className="py-3.5 px-4">ADVERTISER</th>
              <th className="py-3.5 px-4">TYPE</th>
              <th className="py-3.5 px-4">PAYOUT</th>
              <th className="py-3.5 px-4">DAILY CAP</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">CREATED</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <input type="checkbox" checked={selectedIds.includes(c.id)} onChange={() => handleToggleSelect(c.id)} className="rounded bg-slate-900 border-slate-700 text-blue-500" />
                </td>
                <td className="py-3 px-4">
                  <div>
                    <span className="font-bold text-white block">{c.title}</span>
                    <span className="text-[10px] text-slate-500 truncate block max-w-xs">{c.targetUrl}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-blue-400">{c.advertiser}</td>
                <td className="py-3 px-4"><Badge variant={c.type}>{c.type}</Badge></td>
                <td className="py-3 px-4 font-bold text-emerald-400">${c.payout.toFixed(2)}</td>
                <td className="py-3 px-4 font-mono text-slate-400">${c.dailyCap}/day</td>
                <td className="py-3 px-4"><Badge variant={c.status}>{c.status}</Badge></td>
                <td className="py-3 px-4 text-slate-400">{c.created}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {c.status === "Pending" && (
                      <>
                        <button onClick={() => { setApprovingCamp(c); setApprovalNotes(""); }} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Approve</button>
                        <button onClick={() => { setRejectingCamp(c); setRejectionReason(""); }} className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 font-semibold text-[11px]">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {approvingCamp && (
        <Modal isOpen={true} onClose={() => setApprovingCamp(null)} title="Approve Campaign" footer={
          <>
            <button onClick={() => setApprovingCamp(null)} className="px-4 py-2 text-xs font-semibold text-slate-400">Cancel</button>
            <button onClick={() => { approveCampaign(approvingCamp.id, approvalNotes); setApprovingCamp(null); }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white">Confirm Approval</button>
          </>
        }>
          <div className="space-y-3">
            <p className="text-xs text-slate-300">Are you sure you want to approve campaign <strong className="text-white">{approvingCamp.title}</strong>?</p>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Approval Notes (Optional)</label>
              <textarea rows={3} value={approvalNotes} onChange={(e) => setApprovalNotes(e.target.value)} placeholder="Add any compliance or payout notes..." className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-white" />
            </div>
          </div>
        </Modal>
      )}

      {rejectingCamp && (
        <Modal isOpen={true} onClose={() => setRejectingCamp(null)} title="Reject Campaign" footer={
          <>
            <button onClick={() => setRejectingCamp(null)} className="px-4 py-2 text-xs font-semibold text-slate-400">Cancel</button>
            <button onClick={() => { rejectCampaign(rejectingCamp.id, rejectionReason); setRejectingCamp(null); }} className="px-4 py-2 rounded-xl bg-rose-500 text-xs font-semibold text-white">Confirm Rejection</button>
          </>
        }>
          <div className="space-y-3">
            <p className="text-xs text-slate-300">Please provide a reason for rejecting <strong className="text-white">{rejectingCamp.title}</strong>:</p>
            <textarea rows={3} value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Explain reason (e.g. invalid target URL, inappropriate content)..." required className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-white" />
          </div>
        </Modal>
      )}
    </div>
  );
}