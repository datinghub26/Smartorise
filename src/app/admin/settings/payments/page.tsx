"use client";
import React, { useState } from "react";
import { DollarSign, Save } from "lucide-react";
import { useApp } from "../../../../context/AppStateContext";

export default function PaymentSettingsPage() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings.payments);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings("payments", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Payment Gateway Settings</h1>
        <p className="text-sm text-slate-400">Manage Stripe API keys, PayPal credentials & cryptocurrency wallets</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">PayPal API Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Client ID</label>
              <input type="text" value={formData.paypal_client_id} onChange={(e) => setFormData({ ...formData, paypal_client_id: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Environment</label>
              <select value={formData.paypal_environment} onChange={(e) => setFormData({ ...formData, paypal_environment: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white">
                <option value="sandbox">Sandbox</option>
                <option value="live">Live Production</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Crypto Wallets (USDT TRC20 & BTC)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">USDT TRC-20 Address</label>
              <input type="text" value={formData.usdt_trc20_address} onChange={(e) => setFormData({ ...formData, usdt_trc20_address: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white font-mono" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Bitcoin (BTC) Address</label>
              <input type="text" value={formData.btc_address} onChange={(e) => setFormData({ ...formData, btc_address: e.target.value })} className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white font-mono" />
            </div>
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-white text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">
          <Save className="h-4 w-4" />
          Save Payment Settings
        </button>
      </form>
    </div>
  );
}