"use client";
import React, { useState } from "react";
import { Radio, Plus, Trash2 } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function AnnouncementsPage() {
  const { announcements, addAnnouncement, toggleAnnouncement, deleteAnnouncement } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<any>("Info");
  const [newAudience, setNewAudience] = useState<any>("All");

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    addAnnouncement({
      title: newTitle,
      type: newType,
      audience: newAudience,
      status: "Active",
      start: "Immediate",
      end: "No end"
    });
    setShowAdd(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Announcements</h1>
          <p className="text-sm text-slate-400">Global notice banners, maintenance warnings & broadcast alerts</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Announcement
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">Title</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Audience</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Start</th>
              <th className="py-3.5 px-4">End</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {announcements.map((a) => (
              <tr key={a.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{a.title}</td>
                <td className="py-3 px-4"><Badge variant={a.type}>{a.type}</Badge></td>
                <td className="py-3 px-4 font-semibold text-blue-400">{a.audience}</td>
                <td className="py-3 px-4"><Badge variant={a.status}>{a.status}</Badge></td>
                <td className="py-3 px-4 text-slate-400">{a.start}</td>
                <td className="py-3 px-4 text-slate-400">{a.end}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => toggleAnnouncement(a.id)} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-semibold">{a.status === "Active" ? "Disable" : "Enable"}</button>
                    <button onClick={() => deleteAnnouncement(a.id)} className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <Modal isOpen={true} onClose={() => setShowAdd(false)} title="Create Notice Announcement" footer={
          <div className="flex gap-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white">Publish Banner</button>
          </div>
        }>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Banner Title / Message</label>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Scheduled maintenance tonight at 02:00 UTC" className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Notice Type</label>
              <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white">
                <option value="Info">Info</option>
                <option value="Warning">Warning</option>
                <option value="Critical">Critical</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Audience</label>
              <select value={newAudience} onChange={(e) => setNewAudience(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-white">
                <option value="All">All Users</option>
                <option value="Publishers">Publishers Only</option>
                <option value="Advertisers">Advertisers Only</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}