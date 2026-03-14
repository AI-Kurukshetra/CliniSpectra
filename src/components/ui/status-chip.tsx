import type {
  AlertSeverity,
  PatientStatus,
  TrendDirection,
} from "@/types/dashboard";

type StatusChipProps = {
  label: string;
  tone: AlertSeverity | PatientStatus | TrendDirection;
};

const toneMap: Record<StatusChipProps["tone"], string> = {
  critical: "bg-rose-100 text-rose-700",
  high: "bg-rose-100 text-rose-700",
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  stable: "bg-emerald-100 text-emerald-700",
  up: "bg-emerald-100 text-emerald-700",
  down: "bg-sky-100 text-sky-700",
  watch: "bg-amber-100 text-amber-700",
};

export function StatusChip({ label, tone }: StatusChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneMap[tone]}`}
    >
      {label}
    </span>
  );
}
