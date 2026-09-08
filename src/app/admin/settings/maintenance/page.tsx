"use client";
import React, { useState } from "react";
import { Wrench, Save } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";

export default function MaintenanceSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.maintenance);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("maintenance", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance & Sandbox Mode</h1>
        <p className="text-sm text-slate-400">Temporary system maintenance lockdowns & global sandbox switches</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
          <input type="checkbox" checked={formData.maintenance_mode} onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
          <span className="text-white font-bold text-xs">Enable Platform Maintenance Mode</span>
        </label>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Maintenance Message</label>
          <textarea rows={3} value={formData.maintenance_message} onChange={(e) => setFormData({ ...formData, maintenance_message: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white" />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Allowed IPs (Whitelist)</label>
          <input type="text" value={formData.maintenance_allowed_ips} onChange={(e) => setFormData({ ...formData, maintenance_allowed_ips: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white font-mono" />
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </form>
    </div>
  );
}