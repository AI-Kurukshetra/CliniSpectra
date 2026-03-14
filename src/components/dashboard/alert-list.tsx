import { SectionCard } from "@/components/ui/section-card";
import { StatusChip } from "@/components/ui/status-chip";
import { alerts } from "@/data/dashboard";

export function AlertList() {
  return (
    <SectionCard
      eyebrow="Priority Feed"
      title="Operational alerts"
      description="Signal aggregation from bedside devices, documentation flows, and escalation policies."
    >
      <div className="space-y-4">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className="rounded-[22px] border border-slate-200/70 bg-white p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{alert.id}</p>
                <h3 className="text-base font-semibold text-slate-950">
                  {alert.title}
                </h3>
              </div>
              <StatusChip label={alert.severity} tone={alert.severity} />
            </div>
            <p className="mt-3 text-sm text-slate-600">{alert.summary}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              {alert.source}
            </p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
