"use client";

import React from "react";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05080F] text-slate-300 flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0 transition-all duration-300">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
