"use client";
import React from "react";
import { FileCode, Plus } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";

export default function PagesPage() {
  const { settings } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Static CMS Pages</h1>
          <p className="text-sm text-slate-400">Content pages, Terms of Service, Privacy Policy & footer links</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase font-semibold">
              <th className="py-3.5 px-4">TITLE</th>
              <th className="py-3.5 px-4">SLUG</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-4">FOOTER</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {settings.pages.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-bold text-white">{p.title}</td>
                <td className="py-3 px-4 font-mono text-blue-400">{p.slug}</td>
                <td className="py-3 px-4"><Badge variant="active">{p.status}</Badge></td>
                <td className="py-3 px-4">{p.footer ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}