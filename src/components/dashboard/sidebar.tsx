import { navItems } from "@/data/dashboard";

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col justify-between rounded-[32px] bg-slate-950 p-6 text-slate-100 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/20 text-sm font-bold text-cyan-200">
            CAI
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Clinical AI
            </p>
            <h1 className="text-lg font-semibold">Platform</h1>
          </div>
        </div>

        <nav className="mt-10 space-y-3">
          {navItems.map((item, index) => {
            const active = index === 0;

            return (
              <button
                key={item.label}
                type="button"
                className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                  active
                    ? "bg-white text-slate-950"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <div className="font-medium">{item.label}</div>
                <div
                  className={`text-sm ${
                    active ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {item.description}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
          Governance
        </p>
        <p className="mt-2 text-sm text-slate-300">
          PHI-safe workspace with role-based review queues and audit trails.
        </p>
      </div>
    </aside>
  );
}
