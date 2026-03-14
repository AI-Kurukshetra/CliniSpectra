"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

let chartRegistered = false;

export function ensureChartJs() {
  if (chartRegistered) {
    return;
  }

  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Colors,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
  );

  ChartJS.defaults.color = "#334155";
  ChartJS.defaults.font.family =
    'Aptos, "Segoe UI Variable Display", "Segoe UI", sans-serif';
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;

  chartRegistered = true;
}

export { ChartJS };
