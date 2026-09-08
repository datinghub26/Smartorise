"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Coins,
  Gift,
  Trophy,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Flame,
  Star,
  Copy,
  AlertTriangle,
  Play
} from "lucide-react";
import { UserNavbar } from "../components/user/UserNavbar";
import { useApp } from "../context/AppStateContext";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";

export default function UserWebsitePage() {
  const {
    settings,
    offers,
    providers,
    users,
    updateUser,
    announcements,
    withdrawals,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<"earn" | "cashout" | "leaderboard" | "referrals">("earn");
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  // Cashout Modal State
  const [cashoutModal, setCashoutModal] = useState<any | null>(null);
  const [cashoutDetails, setCashoutDetails] = useState("");
  const [cashoutAmount, setCashoutAmount] = useState<number>(5.0);

  const currentUser = users[0] || { balance: 1450, name: "Admin", email: "admin@admin.com", id: "usr_1" };

  // Active announcement from Admin panel
  const activeAnnouncement = announcements.find((a) => a.status === "Active");

  // If Admin has enabled maintenance mode
  if (settings.maintenance.maintenance_mode) {
    return (
      <div className="min-h-screen bg-[#05080F] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="h-16 w-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Maintenance Mode Active</h1>
        <p className="text-slate-400 max-w-md text-sm mb-6">
          {settings.maintenance.maintenance_message}
        </p>
        <Link
          href="/admin/dashboard"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-xs shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition"
        >
          Access Admin Panel to Disable →
        </Link>
      </div>
    );
  }

  // Simulate completing an offer & triggering S2S postback
  const handleSimulateCompletion = (offer: any) => {
    const coinReward = Math.round(offer.reward * 1000);
    updateUser(currentUser.id, {
      balance: currentUser.balance + coinReward,
    });
    showToast(`Success! Completed "${offer.title}". Credited +${coinReward} Coins!`, "success");
    setSelectedOffer(null);
    setSelectedProvider(null);
  };

  // Submit cashout request
  const handleRequestCashout = () => {
    const requiredCoins = cashoutAmount * 1000;
    if (currentUser.balance < requiredCoins) {
      showToast(`Insufficient balance! You need ${requiredCoins} Coins ($${cashoutAmount.toFixed(2)})`, "error");
      return;
    }

    if (!cashoutDetails.trim()) {
      showToast("Please enter your payout address / email", "error");
      return;
    }

    // Deduct coins & create withdrawal entry
    updateUser(currentUser.id, {
      balance: currentUser.balance - requiredCoins,
    });

    const newWithdrawal = {
      id: `wth_${Date.now()}`,
      user: currentUser.email,
      email: currentUser.email,
      amount: cashoutAmount,
      method: cashoutModal.method,
      accountDetails: cashoutDetails,
      status: "Pending" as const,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    withdrawals.unshift(newWithdrawal);
    showToast(`Withdrawal of $${cashoutAmount.toFixed(2)} submitted! Admin review pending.`, "success");
    setCashoutModal(null);
    setCashoutDetails("");
  };

  return (
    <div className="min-h-screen bg-[#05080F] text-slate-300 flex flex-col">
      <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Live Admin Announcement Banner */}
      {activeAnnouncement && (
        <div className="bg-amber-500/15 border-b border-amber-500/20 py-2.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-300 font-semibold">
            <Flame className="h-4 w-4 text-amber-400" />
            <span>{activeAnnouncement.title}</span>
          </div>
        </div>
      )}

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* TAB 1: EARN OFFERS */}
        {activeTab === "earn" && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-900 p-8 sm:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400">
                  <Star className="h-3.5 w-3.5 fill-emerald-400" />
                  <span>Highest Payout Rates in 2026</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Get Paid For <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Games, Surveys & Apps</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Complete high-yielding CPA and CPI offers from top partner ad networks. Fast instant cashouts via PayPal, Crypto, or Amazon gift cards.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveTab("cashout")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-xs sm:text-sm text-white shadow-xl shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    View Cashout Shop →
                  </button>
                  <Link
                    href="/admin/offers"
                    className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold text-xs sm:text-sm text-slate-300 hover:text-white transition"
                  >
                    Manage Offers in Admin
                  </Link>
                </div>
              </div>
            </div>

            {/* Offerwall Providers Hub */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Partner Offerwalls</h2>
                  <p className="text-xs text-slate-400">Select an ad network to browse hundreds of tasks</p>
                </div>
                <Link href="/admin/providers" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
                  Configure Networks in Admin →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {providers.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p)}
                    className="p-4 rounded-2xl border border-white/10 bg-[#0b1120]/75 hover:border-white/20 hover:scale-[1.02] transition cursor-pointer shadow-lg text-center space-y-2 group"
                  >
                    <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-white font-extrabold text-lg group-hover:scale-110 transition">
                      {p.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs truncate">{p.name}</h4>
                      <span className="text-[10px] text-emerald-400 font-bold">{p.offersCount}+ Offers</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Offers Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Featured Tasks & Games</h2>
                  <p className="text-xs text-slate-400">Complete tasks to immediately credit coins to your wallet</p>
                </div>
                <Badge variant="active">{offers.filter(o => o.status === "Active").length} Active</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-4 rounded-2xl border border-white/10 bg-[#0b1120]/75 hover:border-white/20 transition shadow-lg space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative h-32 rounded-xl overflow-hidden border border-white/10">
                        <img src={offer.thumbnail} alt={offer.title} className="h-full w-full object-cover" />
                        <div className="absolute top-2 left-2">
                          <Badge variant="info">{offer.provider}</Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant={offer.category}>{offer.category}</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{offer.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Reach level or complete sign up</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Coins className="h-4 w-4 text-emerald-400" />
                        <span className="font-extrabold text-white text-sm">
                          +{Math.round(offer.reward * 1000).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          (${offer.reward.toFixed(2)})
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedOffer(offer)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-bold text-white shadow-md hover:scale-[1.03] transition"
                      >
                        Earn →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CASHOUT SHOP */}
        {activeTab === "cashout" && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Rewards & Cashout Shop</h1>
              <p className="text-sm text-slate-400">
                Redeem your earned coins for real fiat cash, cryptocurrencies, or digital gift cards.
              </p>
            </div>

            {/* Payout Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* PayPal */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 font-black text-xl">
                      P
                    </div>
                    <Badge variant="active">Instant</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">PayPal Cash</h3>
                    <p className="text-xs text-slate-400">Transferred straight to your PayPal balance</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">From 5,000 Coins ($5.00)</span>
                  <button
                    onClick={() => setCashoutModal({ name: "PayPal", method: "PayPal", icon: "P", min: 5 })}
                    className="px-4 py-2 rounded-xl bg-blue-500 font-bold text-xs text-white hover:bg-blue-600 transition"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Litecoin LTC */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700/50 text-slate-300 font-black text-xl">
                      Ł
                    </div>
                    <Badge variant="active">0% Fee</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Litecoin (LTC)</h3>
                    <p className="text-xs text-slate-400">Direct on-chain crypto payment with zero network fees</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">From 2,000 Coins ($2.00)</span>
                  <button
                    onClick={() => setCashoutModal({ name: "Litecoin (LTC)", method: "Crypto", icon: "Ł", min: 2 })}
                    className="px-4 py-2 rounded-xl bg-emerald-500 font-bold text-xs text-white hover:bg-emerald-600 transition"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Tether USDT */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 font-black text-xl">
                      ₮
                    </div>
                    <Badge variant="info">TRC-20</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Tether (USDT)</h3>
                    <p className="text-xs text-slate-400">Instant USDT deposit to Binance or your Web3 wallet</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">From 5,000 Coins ($5.00)</span>
                  <button
                    onClick={() => setCashoutModal({ name: "Tether (USDT TRC20)", method: "Crypto", icon: "₮", min: 5 })}
                    className="px-4 py-2 rounded-xl bg-emerald-500 font-bold text-xs text-white hover:bg-emerald-600 transition"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Amazon Gift Card */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 font-black text-xl">
                      a
                    </div>
                    <Badge variant="active">Digital Code</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Amazon Gift Card</h3>
                    <p className="text-xs text-slate-400">Emailed digital claim code for Amazon stores</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">From 5,000 Coins ($5.00)</span>
                  <button
                    onClick={() => setCashoutModal({ name: "Amazon Gift Card", method: "Bank", icon: "a", min: 5 })}
                    className="px-4 py-2 rounded-xl bg-amber-500 font-bold text-xs text-white hover:bg-amber-600 transition"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Steam Wallet */}
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 font-black text-xl">
                      S
                    </div>
                    <Badge variant="active">Gamers</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Steam Wallet Card</h3>
                    <p className="text-xs text-slate-400">Top up your Steam account for games and skins</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">From 10,000 Coins ($10.00)</span>
                  <button
                    onClick={() => setCashoutModal({ name: "Steam Wallet", method: "Bank", icon: "S", min: 10 })}
                    className="px-4 py-2 rounded-xl bg-indigo-500 font-bold text-xs text-white hover:bg-indigo-600 transition"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEADERBOARD */}
        {activeTab === "leaderboard" && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Daily Earning Leaderboard</h1>
              <p className="text-sm text-slate-400">
                Top earners every 24 hours win extra bonus cash added to their balance!
              </p>
            </div>

            {/* Podium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-4">
              {/* #2 */}
              <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 text-center space-y-3 order-2 sm:order-1">
                <div className="h-12 w-12 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center font-bold text-white text-lg">
                  #2
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">cpamarketinggrip</h4>
                  <span className="text-xs text-emerald-400 font-extrabold">24,500 Coins</span>
                </div>
                <Badge variant="warning">+$25 Bonus</Badge>
              </div>

              {/* #1 */}
              <div className="p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/15 to-transparent text-center space-y-4 order-1 sm:order-2 scale-105 shadow-xl">
                <div className="h-16 w-16 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-black text-amber-400 text-2xl">
                  🏆 #1
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">ahmedgemy</h4>
                  <span className="text-sm text-emerald-400 font-black">48,200 Coins</span>
                </div>
                <Badge variant="active">+$50 Bonus</Badge>
              </div>

              {/* #3 */}
              <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 text-center space-y-3 order-3">
                <div className="h-12 w-12 mx-auto rounded-full bg-amber-800/30 flex items-center justify-center font-bold text-amber-500 text-lg">
                  #3
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">freshl</h4>
                  <span className="text-xs text-emerald-400 font-extrabold">12,100 Coins</span>
                </div>
                <Badge variant="warning">+$10 Bonus</Badge>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REFERRALS / AFFILIATES */}
        {activeTab === "referrals" && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Affiliate & Referral Program</h1>
              <p className="text-sm text-slate-400">
                Invite friends and earn a lifetime <strong className="text-emerald-400">10% commission</strong> on all their offer completions!
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0b1120]/75 backdrop-blur-xl shadow-xl space-y-4">
              <label className="block text-xs font-bold text-slate-400 uppercase">Your Unique Referral Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://prize.infy.click/?ref=USER9942"
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-white font-mono"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://prize.infy.click/?ref=USER9942");
                    showToast("Referral link copied to clipboard!", "success");
                  }}
                  className="px-4 py-3 rounded-xl bg-blue-500 text-xs font-bold text-white flex items-center gap-1.5 hover:bg-blue-600 transition"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-400 block">Total Referrals</span>
                  <span className="text-lg font-bold text-white">4 Friends</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-400 block">Commission Earned</span>
                  <span className="text-lg font-bold text-emerald-400">$34.20 (34,200 Coins)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Task Completion Simulator Modal */}
      {selectedOffer && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOffer(null)}
          title={`Start Task: ${selectedOffer.title}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button onClick={() => setSelectedOffer(null)} className="text-xs text-slate-400 hover:text-white">
                Cancel
              </button>
              <button
                onClick={() => handleSimulateCompletion(selectedOffer)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-xs text-white shadow-lg flex items-center gap-1.5 hover:scale-[1.02] transition"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Simulate Completion & Credit Coins</span>
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={selectedOffer.thumbnail} alt={selectedOffer.title} className="h-16 w-16 rounded-2xl object-cover border border-white/10" />
              <div>
                <h3 className="font-bold text-white text-base">{selectedOffer.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info">{selectedOffer.provider}</Badge>
                  <Badge variant={selectedOffer.category}>{selectedOffer.category}</Badge>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-white block">Instructions:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Install and open the application on your device.</li>
                <li>Complete registration and reach level 10.</li>
                <li>Your reward of <strong className="text-emerald-400">{Math.round(selectedOffer.reward * 1000).toLocaleString()} Coins</strong> will automatically credit upon server-to-server (S2S) postback verification!</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}

      {/* Provider Iframe Simulator Modal */}
      {selectedProvider && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProvider(null)}
          title={`Offerwall: ${selectedProvider.name}`}
          maxWidth="2xl"
          footer={
            <button onClick={() => setSelectedProvider(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white">
              Close Offerwall
            </button>
          }
        >
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-500/30 flex items-center justify-between text-xs">
              <span className="text-slate-400">Network: <strong className="text-white">{selectedProvider.name}</strong></span>
              <span className="text-emerald-400 font-mono text-[11px]">S2S Callback: Active</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 text-center space-y-4">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <ExternalLink className="h-7 w-7" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{selectedProvider.name} Web SDK Loaded</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  This offerwall is embedded via iframe with your Publisher App Key and user ID appended.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleSimulateCompletion({
                      title: `${selectedProvider.name} Bonus Survey`,
                      reward: 2.50,
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-xs text-white shadow-lg"
                >
                  Test Postback Callback (+2,500 Coins)
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Cashout Request Modal */}
      {cashoutModal && (
        <Modal
          isOpen={true}
          onClose={() => setCashoutModal(null)}
          title={`Withdraw to ${cashoutModal.name}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button onClick={() => setCashoutModal(null)} className="text-xs text-slate-400 hover:text-white">
                Cancel
              </button>
              <button
                onClick={handleRequestCashout}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-xs text-white shadow-lg hover:scale-[1.02] transition"
              >
                Confirm Cashout (${cashoutAmount.toFixed(2)})
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Select Amount ($ USD)</label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 25].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCashoutAmount(amt)}
                    className={`py-2 rounded-xl font-bold border transition ${
                      cashoutAmount === amt
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-white/10 bg-slate-900 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    ${amt}.00 ({(amt * 1000).toLocaleString()} Coins)
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Recipient Info (Email or Wallet Address)</label>
              <input
                type="text"
                value={cashoutDetails}
                onChange={(e) => setCashoutDetails(e.target.value)}
                placeholder="e.g. your-email@gmail.com or 0x..."
                className="w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-white"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
