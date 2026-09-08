"use client";
import React, { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function ContactsPage() {
  const { contacts, deleteContact, updateContactStatus } = useApp();
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Contact Messages</h1>
        <p className="text-sm text-slate-400">Inbound public helpdesk and partnership inquiries</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">FROM</th>
              <th className="py-3.5 px-4">SUBJECT</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {contacts.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <span className="font-bold text-white block">{c.fromName}</span>
                  <span className="text-[11px] text-slate-400">{c.fromEmail}</span>
                </td>
                <td className="py-3 px-4 text-white font-medium">{c.subject}</td>
                <td className="py-3 px-4"><Badge variant={c.status}>{c.status}</Badge></td>
                <td className="py-3 px-4 text-slate-500">{c.date}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedMsg(c)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">View</button>
                    <button onClick={() => deleteContact(c.id)} className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMsg && (
        <Modal isOpen={true} onClose={() => setSelectedMsg(null)} title={`Message from ${selectedMsg.fromName}`} footer={
          <button onClick={() => { updateContactStatus(selectedMsg.id, "Replied"); setSelectedMsg(null); }} className="px-4 py-2 rounded-xl bg-emerald-500 text-xs font-semibold text-white">Mark Replied</button>
        }>
          <div className="space-y-3 text-xs">
            <div><span className="text-slate-400">Sender:</span> <span className="text-white font-bold">{selectedMsg.fromEmail}</span></div>
            <div><span className="text-slate-400">Subject:</span> <span className="text-white font-bold">{selectedMsg.subject}</span></div>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-300 whitespace-pre-wrap">{selectedMsg.message}</div>
          </div>
        </Modal>
      )}
    </div>
  );
}