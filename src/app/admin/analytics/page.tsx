"use client";
import React from "react";
import { BarChart3, TrendingUp, MousePointerClick, ArrowRightLeft, DollarSign } from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics & Business Intelligence</h1>
        <p className="text-sm text-slate-400">Daily performance velocity, geographical yield & network conversion rates</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="REVENUE" value="$0.00" subtext="7-day total" icon={DollarSign} />
        <StatCard label="CLICKS" value="21" subtext="7-day total" icon={MousePointerClick} />
        <StatCard label="CONVERSIONS" value="3" subtext="14.28% conv. rate" icon={ArrowRightLeft} />
        <StatCard label="AVG / CONV" value="$10.96" subtext="Per conversion" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">Top Performing Geography</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">United States (US)</span>
              <span className="text-emerald-400 font-bold">14 clicks (66.6%)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">Egypt (EG)</span>
              <span className="text-blue-400 font-bold">3 clicks (14.2%)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">Germany (DE)</span>
              <span className="text-amber-400 font-bold">2 clicks (9.5%)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">United Kingdom (GB)</span>
              <span className="text-purple-400 font-bold">2 clicks (9.5%)</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">Conversion Yield by Provider</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">BitLabs</span>
              <span className="text-emerald-400 font-bold">$12.50 (1 conv)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">AdGate Media</span>
              <span className="text-emerald-400 font-bold">$18.00 (1 conv)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="font-bold text-white">Torox</span>
              <span className="text-emerald-400 font-bold">$2.40 (1 conv)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}