"use client";
import React, { useState } from "react";
import { Languages, Save } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";

export default function LocalizationSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.localization);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("localization", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Localization Settings</h1>
        <p className="text-sm text-slate-400">Default locale, timezones, currency symbols & number formats</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Default Locale</label>
            <input type="text" value={formData.default_locale} onChange={(e) => setFormData({ ...formData, default_locale: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Timezone</label>
            <input type="text" value={formData.default_timezone} onChange={(e) => setFormData({ ...formData, default_timezone: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Default Currency</label>
            <input type="text" value={formData.default_currency} onChange={(e) => setFormData({ ...formData, default_currency: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Currency Symbol</label>
            <input type="text" value={formData.currency_symbol} onChange={(e) => setFormData({ ...formData, currency_symbol: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save Localization
        </button>
      </form>
    </div>
  );
}