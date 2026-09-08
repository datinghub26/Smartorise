"use client";
import React from "react";
import Link from "next/link";
import { DollarSign, Wallet, TrendingUp, Users, ArrowRight } from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";

export default function FinancialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Financial Management</h1>
        <p className="text-sm text-slate-400">Overall platform profitability, gross margins & publisher wallet liabilities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="TOTAL REVENUE" value="$0.00" icon={DollarSign} />
        <StatCard label="PENDING WITHDRAWALS" value="$0.00" icon={Wallet} />
        <StatCard label="THIS MONTH" value="$0.00" icon={TrendingUp} />
        <StatCard label="PUBLISHER BALANCE" value="$0.00" icon={Users} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/admin/financial/withdrawals" className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 hover:border-white/20 transition flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Withdrawals</h3>
            <p className="text-xs text-slate-400 mt-1">Manage pending cashouts</p>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-400" />
        </Link>
        <Link href="/admin/analytics" className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 hover:border-white/20 transition flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Revenue Report</h3>
            <p className="text-xs text-slate-400 mt-1">View detailed analytics</p>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-400" />
        </Link>
        <Link href="/admin/deposits" className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 hover:border-white/20 transition flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Deposits & Gateways</h3>
            <p className="text-xs text-slate-400 mt-1">View advertiser deposits</p>
          </div>
          <ArrowRight className="h-5 w-5 text-blue-400" />
        </Link>
      </div>
    </div>
  );
}