import { SectionCard } from "@/components/ui/section-card";
import { modelSnapshots } from "@/data/dashboard";

export function ModelPerformance() {
  return (
    <SectionCard
      eyebrow="Model Health"
      title="AI performance snapshots"
      description="Starter panels for governance metrics, latency, and evaluation trends."
    >
      <div className="space-y-4">
        {modelSnapshots.map((item, index) => (
          <div
            key={item.name}
            className="rounded-[24px] border border-slate-200/70 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-950">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
              <p className="text-lg font-semibold text-slate-950">{item.score}</p>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-700"
                style={{ width: `${78 + index * 8}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
