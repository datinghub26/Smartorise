"use client";
import React, { useState } from "react";
import { Cpu, Save } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";

export default function SDKSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.sdk);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("sdk", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">SDK Settings</h1>
        <p className="text-sm text-slate-400">Client-side mobile & Unity SDK parameters, cache intervals & force updates</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Min Android Version</label>
            <input type="text" value={formData.sdk_min_android} onChange={(e) => setFormData({ ...formData, sdk_min_android: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Min iOS Version</label>
            <input type="text" value={formData.sdk_min_ios} onChange={(e) => setFormData({ ...formData, sdk_min_ios: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Min Unity Version</label>
            <input type="text" value={formData.sdk_min_unity} onChange={(e) => setFormData({ ...formData, sdk_min_unity: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
            <input type="checkbox" checked={formData.sdk_tracking_enabled} onChange={(e) => setFormData({ ...formData, sdk_tracking_enabled: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
            <span className="text-slate-200 font-semibold">Enable SDK Tracking</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
            <input type="checkbox" checked={formData.sdk_sandbox_mode} onChange={(e) => setFormData({ ...formData, sdk_sandbox_mode: e.target.checked })} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
            <span className="text-slate-200 font-semibold">SDK Sandbox Testing Mode</span>
          </label>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save SDK Settings
        </button>
      </form>
    </div>
  );
}