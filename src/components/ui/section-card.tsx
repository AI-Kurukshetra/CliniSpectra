import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionCardProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  eyebrow,
  title,
  description,
  action,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/50 bg-white/75 p-6 shadow-[0_20px_70px_rgba(6,24,44,0.08)] backdrop-blur",
        className,
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              {eyebrow}
            </p>
          ) : null}
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 max-w-2xl text-sm text-slate-600">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
