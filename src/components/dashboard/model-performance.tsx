"use client";

import type { ChartData, ChartOptions } from "chart.js";
import { Activity } from "lucide-react";
import { Line } from "react-chartjs-2";

import { SectionCard } from "@/components/ui/section-card";
import { modelSnapshots } from "@/data/dashboard";
import { ensureChartJs } from "@/lib/chart";

ensureChartJs();

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const chartData: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Alert precision",
      data: [88, 90, 91, 93, 92, 94, 96],
      borderColor: "#0284c7",
      backgroundColor: "rgba(2, 132, 199, 0.14)",
      fill: true,
      tension: 0.35,
    },
    {
      label: "Clinician acceptance",
      data: [74, 76, 78, 79, 81, 83, 84],
      borderColor: "#0f766e",
      backgroundColor: "rgba(15, 118, 110, 0.1)",
      fill: true,
      tension: 0.35,
    },
  ],
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      position: "top",
      align: "start",
    },
    tooltip: {
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      min: 60,
      max: 100,
      ticks: {
        callback: (value) => `${value}%`,
      },
      grid: {
        color: "rgba(148, 163, 184, 0.18)",
      },
      border: {
        display: false,
      },
    },
  },
};

export function ModelPerformance() {
  return (
    <SectionCard
      eyebrow="Model Health"
      title="AI performance snapshots"
      description="Weekly quality signals wired through Chart.js so you can replace placeholder metrics with live telemetry."
      action={
        <div className="hidden items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 md:inline-flex">
          <Activity className="size-3.5" />
          Live trend view
        </div>
      }
    >
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[24px] border border-slate-200/70 bg-white p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Model telemetry
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Precision and clinician acceptance over the last 7 days
              </p>
            </div>
            <p className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Stable
            </p>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="space-y-4">
          {modelSnapshots.map((item) => (
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
                style={{
                  width:
                    item.name === "Deterioration Index"
                      ? "94%"
                      : item.name === "Readmission Forecast"
                        ? "88%"
                        : "82%",
                }}
              />
            </div>
          </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
