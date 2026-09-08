"use client";
import React, { useState } from "react";
import { Banknote, Save, Plus } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";
import { Modal } from "../../../../components/ui/Modal";

export default function WithdrawalSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.withdrawal);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [methodName, setMethodName] = useState("");
  const [methodType, setMethodType] = useState("Online");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("withdrawal", formData);
  };

  const handleAddMethod = () => {
    if (!methodName.trim()) return;
    const newMethods = [...formData.methods, { name: methodName, type: methodType, enabled: true, is_default: false }];
    setFormData({ ...formData, methods: newMethods });
    updateSettings("withdrawal", { ...formData, methods: newMethods });
    setShowAddMethod(false);
    setMethodName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Withdrawal Settings</h1>
          <p className="text-sm text-slate-400">Cashout thresholds, processing fees & supported redemption rails</p>
        </div>
        <button onClick={() => setShowAddMethod(true)} className="px-4 py-2 rounded-xl bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 text-xs font-semibold flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Method
        </button>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Minimum Withdrawal ($)</label>
            <input type="number" value={formData.min_withdrawal} onChange={(e) => setFormData({ ...formData, min_withdrawal: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Maximum Withdrawal ($)</label>
            <input type="number" value={formData.max_withdrawal} onChange={(e) => setFormData({ ...formData, max_withdrawal: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Withdrawal Fee (%)</label>
            <input type="number" step="0.1" value={formData.withdrawal_fee_percent} onChange={(e) => setFormData({ ...formData, withdrawal_fee_percent: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Processing Time (Days)</label>
            <input type="number" value={formData.processing_time_days} onChange={(e) => setFormData({ ...formData, processing_time_days: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </form>

      {showAddMethod && (
        <Modal isOpen={true} onClose={() => setShowAddMethod(false)} title="Add Withdrawal Method" footer={
          <button onClick={handleAddMethod} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white">Add</button>
        }>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Method Name</label>
              <input type="text" value={methodName} onChange={(e) => setMethodName(e.target.value)} placeholder="e.g. Skrill, Payeer" className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Type</label>
              <select value={methodType} onChange={(e) => setMethodType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white">
                <option value="Online">Online Wallet</option>
                <option value="Crypto">Cryptocurrency</option>
                <option value="Manual">Manual Wire</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}