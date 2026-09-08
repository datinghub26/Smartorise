import React from "react";

type BadgeVariant =
  | "active"
  | "verified"
  | "pending"
  | "rejected"
  | "suspended"
  | "banned"
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "clean"
  | "suspicious"
  | "blocked"
  | "default"
  | "info"
  | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const v = typeof variant === "string" ? variant.toLowerCase() : "default";

  let colorClasses = "bg-slate-800 text-slate-300 border-slate-700";

  if (v === "active" || v === "verified" || v === "clean" || v === "approved" || v === "delivered" || v === "completed" || v === "published" || v === "yes") {
    colorClasses = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  } else if (v === "pending" || v === "investigating" || v === "medium" || v === "warning" || v === "scheduled") {
    colorClasses = "bg-amber-500/15 text-amber-400 border-amber-500/30";
  } else if (v === "rejected" || v === "failed" || v === "banned" || v === "blocked" || v === "critical" || v === "high" || v === "urgent") {
    colorClasses = "bg-rose-500/15 text-rose-400 border-rose-500/30";
  } else if (v === "suspended" || v === "paused" || v === "dismissed" || v === "inactive" || v === "unsubscribed" || v === "closed" || v === "expired" || v === "no") {
    colorClasses = "bg-slate-700/50 text-slate-400 border-slate-600/40";
  } else if (v === "info" || v === "cpa" || v === "cpi" || v === "survey" || v === "publisher" || v === "advertiser" || v === "admin") {
    colorClasses = "bg-blue-500/15 text-blue-400 border-blue-500/30";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};
