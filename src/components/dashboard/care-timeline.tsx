import { SectionCard } from "@/components/ui/section-card";
import { timeline } from "@/data/dashboard";

export function CareTimeline() {
  return (
    <SectionCard
      eyebrow="Activity Stream"
      title="Care coordination timeline"
      description="Recent actions produced by clinical copilots, automation rules, and human review."
    >
      <div className="space-y-4">
        {timeline.map((item) => (
          <div key={`${item.time}-${item.title}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="mt-1 h-3 w-3 rounded-full bg-cyan-500" />
              <div className="h-full w-px bg-slate-200" />
            </div>
            <div className="pb-4">
              <p className="text-sm font-semibold text-slate-500">{item.time}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
