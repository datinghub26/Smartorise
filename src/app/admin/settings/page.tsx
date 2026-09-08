"use client";
import React, { useState } from "react";
import { Sliders, Save } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";

export default function GeneralSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.general);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("general", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-400">Core platform branding, anti-fraud shields & security parameters</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Platform Name</label>
              <input type="text" value={formData.platform_name} onChange={(e) => setFormData({ ...formData, platform_name: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Support Email</label>
              <input type="email" value={formData.support_email} onChange={(e) => setFormData({ ...formData, support_email: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Admin Commission Rate (%)</label>
              <input type="number" value={formData.admin_commission_rate} onChange={(e) => setFormData({ ...formData, admin_commission_rate: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Minimum Withdrawal ($)</label>
              <input type="number" value={formData.min_withdrawal} onChange={(e) => setFormData({ ...formData, min_withdrawal: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Security & Anti-Fraud</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
              <input type="checkbox" checked={formData.vpn_detection} onChange={(e) => setFormData({ ...formData, vpn_detection: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
              <span className="text-slate-200 font-semibold">Enable VPN / Proxy Detection</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
              <input type="checkbox" checked={formData.email_verification} onChange={(e) => setFormData({ ...formData, email_verification: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
              <span className="text-slate-200 font-semibold">Require Email Verification</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
              <input type="checkbox" checked={formData.fraud_detection} onChange={(e) => setFormData({ ...formData, fraud_detection: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
              <span className="text-slate-200 font-semibold">AI Risk Scoring Active</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
              <input type="checkbox" checked={formData.manual_approval} onChange={(e) => setFormData({ ...formData, manual_approval: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
              <span className="text-slate-200 font-semibold">Manual Cashout Review</span>
            </label>
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </form>
    </div>
  );
}