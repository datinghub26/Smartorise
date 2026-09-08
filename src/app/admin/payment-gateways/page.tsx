"use client";
import React, { useState } from "react";
import { CreditCard, Edit, Check, Globe } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { StatCard } from "../../../components/ui/StatCard";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function PaymentGatewaysPage() {
  const { gateways, updateGateway, toggleGatewaySandbox } = useApp();
  const [editingGw, setEditingGw] = useState<any | null>(null);

  const handleSave = () => {
    if (!editingGw) return;
    updateGateway(editingGw.id, editingGw);
    setEditingGw(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Payment Gateways</h1>
        <p className="text-sm text-slate-400">Configure online, cryptocurrency and manual deposit gateways</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Gateways" value={gateways.length} />
        <StatCard label="Enabled" value={gateways.filter(g => g.active).length} />
        <StatCard label="Sandbox Mode" value={gateways.filter(g => g.sandbox).length} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gateways.map((gw) => (
          <div key={gw.id} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold">
                  {gw.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{gw.name}</h3>
                  <Badge variant="info">{gw.type}</Badge>
                </div>
              </div>
              <Badge variant={gw.sandbox ? "warning" : "active"}>{gw.sandbox ? "Sandbox" : "Live"}</Badge>
            </div>

            <p className="text-xs text-slate-400">{gw.desc}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 text-xs">
              <div>
                <span className="text-slate-500 block">Min</span>
                <span className="font-bold text-white">${gw.min.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Max</span>
                <span className="font-bold text-white">${gw.max.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fee %</span>
                <span className="font-bold text-white">{gw.feePercent.toFixed(2)}%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fixed</span>
                <span className="font-bold text-white">${gw.fixedFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <button onClick={() => toggleGatewaySandbox(gw.id)} className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition">
                {gw.sandbox ? "Go Live" : "Switch to Sandbox"}
              </button>
              <button onClick={() => setEditingGw({ ...gw })} className="px-3 py-1.5 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 font-semibold text-xs transition">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingGw && (
        <Modal isOpen={true} onClose={() => setEditingGw(null)} title={`Configure Gateway: ${editingGw.name}`} footer={
          <>
            <button onClick={() => setEditingGw(null)} className="px-4 py-2 text-xs font-semibold text-slate-400">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white">Save Changes</button>
          </>
        }>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Min Deposit ($)</label>
                <input type="number" value={editingGw.min} onChange={(e) => setEditingGw({ ...editingGw, min: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Max Deposit ($)</label>
                <input type="number" value={editingGw.max} onChange={(e) => setEditingGw({ ...editingGw, max: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Fee Percentage (%)</label>
                <input type="number" step="0.01" value={editingGw.feePercent} onChange={(e) => setEditingGw({ ...editingGw, feePercent: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Fixed Fee ($)</label>
                <input type="number" step="0.01" value={editingGw.fixedFee} onChange={(e) => setEditingGw({ ...editingGw, fixedFee: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}