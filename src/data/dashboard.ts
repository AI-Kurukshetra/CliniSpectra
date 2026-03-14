import type {
  Alert,
  Metric,
  ModelSnapshot,
  NavItem,
  Patient,
  QueueStat,
  TimelineEvent,
} from "@/types/dashboard";

export const navItems: NavItem[] = [
  { label: "Command Center", description: "Live census" },
  { label: "Care Pathways", description: "AI workflows" },
  { label: "Model Governance", description: "Quality controls" },
  { label: "Clinical Ops", description: "Staff actions" },
];

export const metrics: Metric[] = [
  {
    label: "Monitored Patients",
    value: "1,284",
    delta: "+8.2%",
    direction: "up",
    detail: "Across ICU, ED, and step-down units",
  },
  {
    label: "Escalations Prevented",
    value: "312",
    delta: "+14.6%",
    direction: "up",
    detail: "Model-guided interventions this week",
  },
  {
    label: "Chart Review Burden",
    value: "4.1 hrs",
    delta: "-18%",
    direction: "down",
    detail: "Average clinician review time per shift",
  },
  {
    label: "Model Drift",
    value: "0.7%",
    delta: "-0.2%",
    direction: "down",
    detail: "Below governance threshold of 2.0%",
  },
];

export const alerts: Alert[] = [
  {
    id: "ALT-219",
    title: "Sepsis predictor threshold exceeded",
    severity: "high",
    source: "Ward B2",
    summary: "Two patients crossed the 0.85 risk boundary in the last 15 minutes.",
  },
  {
    id: "ALT-184",
    title: "Radiology turnaround lag",
    severity: "medium",
    source: "Imaging queue",
    summary: "Median report latency is 22 minutes above target for stat CT scans.",
  },
  {
    id: "ALT-156",
    title: "Missing discharge summary fields",
    severity: "low",
    source: "Case management",
    summary: "Seven encounters need coded follow-up instructions before noon handoff.",
  },
];

export const queueStats: QueueStat[] = [
  { label: "Pending triage", value: "18" },
  { label: "AI prioritized", value: "6" },
  { label: "Need callback", value: "4" },
];

export const patients: Patient[] = [
  {
    id: "PT-4021",
    name: "Marina Patel",
    age: 58,
    ward: "ICU 4",
    status: "critical",
    riskScore: 92,
    nextAction: "Start vasopressor review",
  },
  {
    id: "PT-3198",
    name: "Darren Lewis",
    age: 46,
    ward: "ED Bay 7",
    status: "watch",
    riskScore: 74,
    nextAction: "Repeat lactate in 30 min",
  },
  {
    id: "PT-2877",
    name: "Janelle Kim",
    age: 67,
    ward: "Ward C1",
    status: "stable",
    riskScore: 33,
    nextAction: "Schedule discharge education",
  },
  {
    id: "PT-2450",
    name: "Rahul Menon",
    age: 71,
    ward: "Step-down 2",
    status: "watch",
    riskScore: 68,
    nextAction: "Review overnight telemetry",
  },
];

export const timeline: TimelineEvent[] = [
  {
    time: "08:10",
    title: "Cardiology copilot flagged medication conflict",
    description: "Medication reconciliation suggested a duplicate beta blocker order.",
  },
  {
    time: "09:25",
    title: "Discharge planner generated follow-up packet",
    description: "Primary care, imaging, and rehab instructions compiled automatically.",
  },
  {
    time: "10:40",
    title: "Critical lab bundle routed to attending",
    description: "Result summary and recommendation set sent to mobile review queue.",
  },
];

export const modelSnapshots: ModelSnapshot[] = [
  {
    name: "Deterioration Index",
    score: "98.4% uptime",
    detail: "Confidence stable across cardiopulmonary cohort",
  },
  {
    name: "Readmission Forecast",
    score: "0.91 AUROC",
    detail: "Performance strongest in heart failure follow-up",
  },
  {
    name: "Coding Assistant",
    score: "17 sec avg",
    detail: "Median summary generation latency",
  },
];
