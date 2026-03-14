import { StatusChip } from "@/components/ui/status-chip";
import type { Metric } from "@/types/dashboard";

type MetricCardProps = {
  metric: Metric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/80 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {metric.value}
          </p>
        </div>
        <StatusChip label={metric.delta} tone={metric.direction} />
      </div>
      <p className="mt-4 text-sm text-slate-600">{metric.detail}</p>
    </div>
  );
}
