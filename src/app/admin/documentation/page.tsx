"use client";
import React, { useState } from "react";
import { BookOpen, Save } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";

export default function DocumentationPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.docs);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("docs", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Documentation Configurator</h1>
        <p className="text-sm text-slate-400">Public developer documentation, SDK release guides & API endpoints</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">API Base URL</label>
            <input type="text" value={formData.api_base_url} onChange={(e) => setFormData({ ...formData, api_base_url: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white font-mono" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">SDK Version</label>
            <input type="text" value={formData.sdk_version} onChange={(e) => setFormData({ ...formData, sdk_version: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Hero Title</label>
            <input type="text" value={formData.doc_hero_title} onChange={(e) => setFormData({ ...formData, doc_hero_title: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Quickstart Title</label>
            <input type="text" value={formData.doc_quickstart_title} onChange={(e) => setFormData({ ...formData, doc_quickstart_title: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white" />
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save Documentation Config
        </button>
      </form>
    </div>
  );
}