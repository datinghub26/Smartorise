"use client";
import React, { useState } from "react";
import { LifeBuoy, Search } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function TicketsPage() {
  const { tickets, updateTicket } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Support Tickets</h1>
        <p className="text-sm text-slate-400">Publisher and advertiser helpdesk support requests</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">SUBJECT</th>
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">CATEGORY</th>
              <th className="py-3.5 px-4">PRIORITY</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">ASSIGNED</th>
              <th className="py-3.5 px-4">DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {tickets.map((t) => (
              <tr key={t.id} onClick={() => setSelectedTicket(t)} className="hover:bg-white/[0.02] cursor-pointer">
                <td className="py-3 px-4 font-bold text-white">{t.subject}</td>
                <td className="py-3 px-4 text-slate-400">{t.user}</td>
                <td className="py-3 px-4">{t.category}</td>
                <td className="py-3 px-4"><Badge variant={t.priority}>{t.priority}</Badge></td>
                <td className="py-3 px-4"><Badge variant={t.status}>{t.status}</Badge></td>
                <td className="py-3 px-4 text-blue-400 font-semibold">{t.assigned}</td>
                <td className="py-3 px-4 text-slate-500">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <Modal isOpen={true} onClose={() => setSelectedTicket(null)} title={`Ticket: ${selectedTicket.subject}`} footer={
          <div className="flex gap-2">
            <button onClick={() => { updateTicket(selectedTicket.id, { status: "Closed" }); setSelectedTicket(null); }} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white">Close Ticket</button>
            <button onClick={() => { updateTicket(selectedTicket.id, { status: "Open" }); setSelectedTicket(null); }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white">Save</button>
          </div>
        }>
          <div className="space-y-3 text-xs">
            <div><span className="text-slate-400">User:</span> <span className="text-white">{selectedTicket.user}</span></div>
            <div><span className="text-slate-400">Category:</span> <span className="text-white">{selectedTicket.category}</span></div>
            <div><span className="text-slate-400">Priority:</span> <Badge variant={selectedTicket.priority}>{selectedTicket.priority}</Badge></div>
          </div>
        </Modal>
      )}
    </div>
  );
}