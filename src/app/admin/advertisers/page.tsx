"use client";
import React, { useState } from "react";
import { Search, Megaphone, CheckCircle, Ban } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function AdvertisersPage() {
  const { advertisers, updateAdvertiser } = useApp();
  const [search, setSearch] = useState("");
  const [selectedAdv, setSelectedAdv] = useState<any | null>(null);

  const filtered = advertisers.filter((a) => a.company.toLowerCase().includes(search.toLowerCase()) || a.contact.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Advertisers</h1>
        <p className="text-sm text-slate-400">Manage direct advertisers, spending limits & campaigns</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">ADVERTISER</th>
              <th className="py-3.5 px-4">CONTACT</th>
              <th className="py-3.5 px-4">OFFERS</th>
              <th className="py-3.5 px-4">SPENT</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{a.company}</td>
                <td className="py-3 px-4 text-slate-400">{a.contact}</td>
                <td className="py-3 px-4 font-semibold">{a.offersCount} active</td>
                <td className="py-3 px-4 font-bold text-emerald-400">${a.spent.toFixed(2)}</td>
                <td className="py-3 px-4"><Badge variant={a.status}>{a.status}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedAdv(a)} className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-semibold text-[11px]">View</button>
                    {a.status === "Active" ? (
                      <button onClick={() => updateAdvertiser(a.id, { status: "Suspended" })} className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 font-semibold text-[11px]">Deactivate</button>
                    ) : (
                      <button onClick={() => updateAdvertiser(a.id, { status: "Active" })} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]">Activate</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAdv && (
        <Modal isOpen={true} onClose={() => setSelectedAdv(null)} title={`Advertiser: ${selectedAdv.company}`}>
          <div className="space-y-3 text-sm">
            <div><span className="text-slate-400">Contact:</span> <span className="text-white">{selectedAdv.contact}</span></div>
            <div><span className="text-slate-400">Lifetime Spend:</span> <span className="text-emerald-400 font-bold">${selectedAdv.spent.toFixed(2)}</span></div>
            <div><span className="text-slate-400">Active Offers:</span> <span className="text-white">{selectedAdv.offersCount}</span></div>
          </div>
        </Modal>
      )}
    </div>
  );
}