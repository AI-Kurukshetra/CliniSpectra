import type {
  AlertSeverity,
  PatientStatus,
  TrendDirection,
} from "@/types/dashboard";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type StatusChipProps = {
  label: string;
  tone: AlertSeverity | PatientStatus | TrendDirection;
};

const toneMap: Record<
  StatusChipProps["tone"],
  { className: string; icon: LucideIcon }
> = {
  critical: {
    className: "bg-rose-100 text-rose-700",
    icon: ShieldAlert,
  },
  high: {
    className: "bg-rose-100 text-rose-700",
    icon: ShieldAlert,
  },
  low: {
    className: "bg-emerald-100 text-emerald-700",
    icon: ShieldCheck,
  },
  medium: {
    className: "bg-amber-100 text-amber-700",
    icon: Activity,
  },
  stable: {
    className: "bg-emerald-100 text-emerald-700",
    icon: ShieldCheck,
  },
  up: {
    className: "bg-emerald-100 text-emerald-700",
    icon: ArrowUpRight,
  },
  down: {
    className: "bg-sky-100 text-sky-700",
    icon: ArrowDownRight,
  },
  watch: {
    className: "bg-amber-100 text-amber-700",
    icon: Activity,
  },
};

export function StatusChip({ label, tone }: StatusChipProps) {
  const { className, icon: Icon } = toneMap[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}
