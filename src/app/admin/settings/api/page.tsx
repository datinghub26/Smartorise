"use client";
import React, { useState } from "react";
import { Globe, Save } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";

export default function APISettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.api);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("api", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">API Settings</h1>
        <p className="text-sm text-slate-400">REST API rate-limiting rules, CORS origins & security payload limits</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Rate Limit (Req/Window)</label>
            <input type="number" value={formData.api_rate_limit} onChange={(e) => setFormData({ ...formData, api_rate_limit: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Timeout (Seconds)</label>
            <input type="number" value={formData.api_timeout_seconds} onChange={(e) => setFormData({ ...formData, api_timeout_seconds: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">CORS Origins</label>
            <input type="text" value={formData.api_cors_origins} onChange={(e) => setFormData({ ...formData, api_cors_origins: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white font-mono" />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save API Settings
        </button>
      </form>
    </div>
  );
}