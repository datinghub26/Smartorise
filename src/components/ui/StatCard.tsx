import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  isNegative?: boolean;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  trend,
  isNegative,
  icon: Icon,
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120]/75 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl transition-all duration-200 hover:border-white/20 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {label}
        </span>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-white">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              isNegative ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
        {actionText && (
          <button
            onClick={onAction}
            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
