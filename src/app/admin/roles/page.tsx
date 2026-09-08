"use client";
import React from "react";
import { Lock } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function RolesPage() {
  const { settings } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Roles & Permissions</h1>
        <p className="text-sm text-slate-400">Role-Based Access Control (RBAC) & capability matrices</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">ROLE</th>
              <th className="py-3.5 px-4">SLUG</th>
              <th className="py-3.5 px-4">SUPER ADMIN</th>
              <th className="py-3.5 px-4">PERMISSIONS</th>
              <th className="py-3.5 px-4">USERS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {settings.roles.map((r) => (
              <tr key={r.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{r.role}</td>
                <td className="py-3 px-4 font-mono text-blue-400">{r.slug}</td>
                <td className="py-3 px-4"><Badge variant={r.superAdmin ? "active" : "default"}>{r.superAdmin ? "Yes" : "No"}</Badge></td>
                <td className="py-3 px-4 font-semibold">{r.permissionsCount} capabilities</td>
                <td className="py-3 px-4 font-bold">{r.usersCount} users</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}