import { SectionCard } from "@/components/ui/section-card";
import { StatusChip } from "@/components/ui/status-chip";
import { patients, queueStats } from "@/data/dashboard";

export function PatientQueue() {
  return (
    <SectionCard
      eyebrow="Live Triage"
      title="Patient review queue"
      description="A typed dataset placeholder ready to be wired to EHR, FHIR, or event streaming backends."
      action={
        <div className="flex flex-wrap gap-2">
          {queueStats.map((item) => (
            <div
              key={item.label}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              {item.label}: {item.value}
            </div>
          ))}
        </div>
      }
    >
      <div className="space-y-3">
        {patients.map((patient) => (
          <article
            key={patient.id}
            className="grid gap-4 rounded-[22px] border border-slate-200/70 bg-white p-4 md:grid-cols-[1.2fr_0.7fr_0.8fr]"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-slate-950">
                  {patient.name}
                </h3>
                <StatusChip label={patient.status} tone={patient.status} />
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {patient.id} • Age {patient.age} • {patient.ward}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Risk score
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {patient.riskScore}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Next action
              </p>
              <p className="mt-2 text-sm text-slate-700">{patient.nextAction}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
