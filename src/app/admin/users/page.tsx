"use client";

import React, { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Trash2, Edit, Shield, UserCheck } from "lucide-react";
import { useApp } from "../../../context/AppStateContext";
import { Badge } from "../../../components/ui/Badge";
import { Modal } from "../../../components/ui/Modal";

export default function UsersPage() {
  const { users, updateUser, deleteUser } = useApp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [balanceDelta, setBalanceDelta] = useState<number>(0);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSaveUser = () => {
    if (!editingUser) return;
    updateUser(editingUser.id, {
      role: editingUser.role,
      status: editingUser.status,
      balance: Math.max(0, Number(editingUser.balance) + Number(balanceDelta)),
    });
    setEditingUser(null);
    setBalanceDelta(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Users Management</h1>
          <p className="text-sm text-slate-400">Master user directory, role assignments & balances</p>
        </div>
      </div>

      {/* Filter Surface */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 p-4 backdrop-blur-xl shadow-xl flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">ROLE</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Roles</option>
            <option value="Publisher">Publisher</option>
            <option value="Advertiser">Advertiser</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">STATUS</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
            <option value="Banned">Banned</option>
          </select>
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-white/10 bg-slate-900 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => {
            setSearch("");
            setRoleFilter("All");
            setStatusFilter("All");
          }}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          Reset Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1120]/75 overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">USER</th>
                <th className="py-3.5 px-4">ROLE</th>
                <th className="py-3.5 px-4">ACCOUNT</th>
                <th className="py-3.5 px-4">PUBLISHER</th>
                <th className="py-3.5 px-4">BALANCE</th>
                <th className="py-3.5 px-4">JOINED</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 font-bold border border-blue-500/30">
                        {u.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{u.name}</span>
                        <span className="text-[11px] text-slate-400 block">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={u.role}>{u.role}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={u.status}>{u.status}</Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{u.publisherId || "-"}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">
                    ${u.balance.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{u.joined}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setBalanceDelta(0);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {u.status === "Pending" && (
                        <button
                          onClick={() => updateUser(u.id, { status: "Active" })}
                          className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[11px] font-semibold transition"
                        >
                          Approve
                        </button>
                      )}
                      {u.status === "Active" ? (
                        <button
                          onClick={() => updateUser(u.id, { status: "Suspended" })}
                          className="px-2 py-1 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 text-[11px] font-semibold transition"
                        >
                          Suspend
                        </button>
                      ) : u.status === "Suspended" ? (
                        <button
                          onClick={() => updateUser(u.id, { status: "Active" })}
                          className="px-2 py-1 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 text-[11px] font-semibold transition"
                        >
                          Activate
                        </button>
                      ) : null}
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <Modal
          isOpen={true}
          onClose={() => setEditingUser(null)}
          title={`Edit User: ${editingUser.name}`}
          footer={
            <>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-semibold text-white shadow-lg"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">User Role</label>
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                className="w-full h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white"
              >
                <option value="Publisher">Publisher</option>
                <option value="Advertiser">Advertiser</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Account Status</label>
              <select
                value={editingUser.status}
                onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                className="w-full h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="Banned">Banned</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Current Balance</label>
              <div className="text-sm font-bold text-emerald-400 mb-2">${editingUser.balance.toFixed(2)}</div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Adjust Balance (+/- USD)</label>
              <input
                type="number"
                value={balanceDelta}
                onChange={(e) => setBalanceDelta(Number(e.target.value))}
                placeholder="0.00"
                className="w-full h-9 rounded-xl border border-white/10 bg-slate-900 px-3 text-xs text-white"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
