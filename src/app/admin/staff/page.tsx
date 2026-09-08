"use client";
import React from "react";
import { UserCheck } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function StaffPage() {
  const { settings } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Staff Members</h1>
        <p className="text-sm text-slate-400">Administration users, permission groups & activity status</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">USER</th>
              <th className="py-3.5 px-4">EMAIL</th>
              <th className="py-3.5 px-4">ROLE</th>
              <th className="py-3.5 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {settings.staff.map((s) => (
              <tr key={s.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{s.user}</td>
                <td className="py-3 px-4 text-slate-400">{s.email}</td>
                <td className="py-3 px-4"><Badge variant="info">{s.role}</Badge></td>
                <td className="py-3 px-4"><Badge variant="active">{s.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}