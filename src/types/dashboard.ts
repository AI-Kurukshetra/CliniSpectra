export type TrendDirection = "up" | "down";

export type Metric = {
  label: string;
  value: string;
  delta: string;
  direction: TrendDirection;
  detail: string;
};

export type AlertSeverity = "high" | "medium" | "low";

export type Alert = {
  id: string;
  title: string;
  severity: AlertSeverity;
  source: string;
  summary: string;
};

export type PatientStatus = "stable" | "watch" | "critical";

export type Patient = {
  id: string;
  name: string;
  age: number;
  ward: string;
  status: PatientStatus;
  riskScore: number;
  nextAction: string;
};

export type TimelineEvent = {
  time: string;
  title: string;
  description: string;
};

export type ModelSnapshot = {
  name: string;
  score: string;
  detail: string;
};

export type QueueStat = {
  label: string;
  value: string;
};

export type NavItem = {
  label: string;
  description: string;
};
