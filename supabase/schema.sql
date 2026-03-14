create extension if not exists pgcrypto;

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  mrn text unique not null,
  first_name text not null,
  last_name text not null,
  date_of_birth date,
  sex text,
  phone text,
  email text,
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.clinical_encounters (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  encounter_type text not null,
  encounter_status text not null default 'active',
  provider_name text,
  department text,
  facility_name text,
  admission_at timestamptz,
  discharge_at timestamptz,
  chief_complaint text,
  diagnosis text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.medications (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  encounter_id uuid references public.clinical_encounters(id) on delete set null,
  medication_name text not null,
  dosage text,
  route text,
  frequency text,
  started_at timestamptz,
  ended_at timestamptz,
  prescribing_provider text,
  instructions text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lab_results (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  encounter_id uuid references public.clinical_encounters(id) on delete set null,
  test_name text not null,
  test_code text,
  result_value text not null,
  unit text,
  reference_range text,
  status text not null default 'final',
  collected_at timestamptz,
  reported_at timestamptz,
  abnormal_flag text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.allergies (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  allergen text not null,
  reaction text,
  severity text,
  status text not null default 'active',
  noted_at timestamptz,
  source text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.risk_scores (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  encounter_id uuid references public.clinical_encounters(id) on delete set null,
  model_name text not null,
  score numeric(6, 3) not null,
  risk_level text not null,
  explanation jsonb,
  scored_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  constraint risk_scores_score_range check (score >= 0 and score <= 100)
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  encounter_id uuid references public.clinical_encounters(id) on delete set null,
  risk_score_id uuid references public.risk_scores(id) on delete set null,
  alert_type text not null,
  severity text not null,
  status text not null default 'open',
  title text not null,
  message text,
  triggered_at timestamptz not null default timezone('utc', now()),
  acknowledged_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.patient_summaries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null unique references public.patients(id) on delete cascade,
  encounter_id uuid references public.clinical_encounters(id) on delete set null,
  summary_text text not null,
  summary_json jsonb,
  generated_by text,
  generated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_clinical_encounters_patient_id
  on public.clinical_encounters(patient_id);

create index if not exists idx_medications_patient_id
  on public.medications(patient_id);

create index if not exists idx_medications_encounter_id
  on public.medications(encounter_id);

create index if not exists idx_lab_results_patient_id
  on public.lab_results(patient_id);

create index if not exists idx_lab_results_encounter_id
  on public.lab_results(encounter_id);

create index if not exists idx_lab_results_reported_at
  on public.lab_results(reported_at desc);

create index if not exists idx_allergies_patient_id
  on public.allergies(patient_id);

create index if not exists idx_risk_scores_patient_id
  on public.risk_scores(patient_id);

create index if not exists idx_risk_scores_encounter_id
  on public.risk_scores(encounter_id);

create index if not exists idx_risk_scores_scored_at
  on public.risk_scores(scored_at desc);

create index if not exists idx_alerts_patient_id
  on public.alerts(patient_id);

create index if not exists idx_alerts_encounter_id
  on public.alerts(encounter_id);

create index if not exists idx_alerts_risk_score_id
  on public.alerts(risk_score_id);

create index if not exists idx_alerts_status_triggered_at
  on public.alerts(status, triggered_at desc);

create index if not exists idx_patient_summaries_patient_id
  on public.patient_summaries(patient_id);

alter table public.patients enable row level security;
alter table public.clinical_encounters enable row level security;
alter table public.medications enable row level security;
alter table public.lab_results enable row level security;
alter table public.allergies enable row level security;
alter table public.risk_scores enable row level security;
alter table public.alerts enable row level security;
alter table public.patient_summaries enable row level security;
