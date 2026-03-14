import { AlertList } from "@/components/dashboard/alert-list";
import { CareTimeline } from "@/components/dashboard/care-timeline";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ModelPerformance } from "@/components/dashboard/model-performance";
import { PatientQueue } from "@/components/dashboard/patient-queue";
import { Sidebar } from "@/components/dashboard/sidebar";
import { metrics } from "@/data/dashboard";

export function DashboardShell() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.24),_transparent_28%),linear-gradient(180deg,_#f5fbff_0%,_#eef5ff_45%,_#f8fafc_100%)] px-4 py-4 text-slate-950 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />

        <div className="space-y-4">
          <section className="overflow-hidden rounded-[32px] border border-white/60 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_90px_rgba(8,15,28,0.24)] md:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                  Healthcare AI Dashboard
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                  Monitor patient risk, operational throughput, and model safety in one workspace.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  This starter uses the Next.js App Router with TypeScript and Tailwind CSS, and it is organized for adding authenticated routes, data clients, and modular dashboard features.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Today&apos;s response SLA</p>
                  <p className="mt-3 text-3xl font-semibold">12 min</p>
                  <p className="mt-2 text-sm text-cyan-200">
                    Avg time from alert to clinician acknowledgement
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-cyan-400/20 to-transparent p-5">
                  <p className="text-sm text-slate-300">Deployment ready</p>
                  <p className="mt-3 text-3xl font-semibold">App Router</p>
                  <p className="mt-2 text-sm text-slate-200">
                    Extend with route groups, server actions, and API handlers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="grid gap-4 2xl:grid-cols-[1.3fr_0.7fr]">
            <PatientQueue />
            <AlertList />
          </section>

          <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <ModelPerformance />
            <CareTimeline />
          </section>
        </div>
      </div>
    </main>
  );
}
