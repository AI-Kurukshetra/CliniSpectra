@echo off
echo Setting up Codex Clinical AI prompts...

set PROMPT_DIR=.codex\prompts\clinical-ai

mkdir "%PROMPT_DIR%" 2>nul
cd "%PROMPT_DIR%"

echo Creating prompt files...

echo Create a Next.js 14 project with TypeScript, TailwindCSS, and folder structure for a clinical AI dashboard. > 01_project_scaffold.md

echo Install dependencies: @supabase/supabase-js, openai, chart.js, react-chartjs-2, zod, lucide-react, shadcn-ui. > 02_install_dependencies.md

echo Create Supabase client configuration in lib/supabase.ts using environment variables. > 03_supabase_setup.md

echo Generate SQL schema for tables: patients, clinical_encounters, medications, lab_results, allergies, alerts, risk_scores, patient_summaries. > 04_database_schema.md

echo Create API routes for patients, encounters, lab results, and alerts using Supabase queries. > 05_api_routes.md

echo Create an API route /api/ai-summary that generates patient summaries using OpenAI. > 06_ai_patient_summary.md

echo Create AI differential diagnosis endpoint /api/diagnosis returning ranked possible conditions. > 07_differential_diagnosis.md

echo Create drug interaction checker API route /api/drug-interactions detecting medication conflicts. > 08_drug_interaction_checker.md

echo Create a dashboard UI showing patient list, alerts, and AI summaries using Tailwind. > 09_dashboard_ui.md

echo Create dynamic page /patients/[id] displaying patient history, labs, medications, and AI summary. > 10_patient_profile_page.md

echo Create a ClinicalTimeline component using chart.js to visualize patient medical history. > 11_clinical_timeline.md

echo Create RiskScoreCard component calculating diabetes and heart disease risk. > 12_risk_score.md

echo Implement medical alerts system for abnormal labs and drug interactions. > 13_alert_system.md

echo Implement care gap detection for missing screenings and overdue follow-ups. > 14_care_gap_detection.md

echo Generate demo patient data including diabetes, hypertension, labs, and medications. > 15_seed_demo_data.md

echo.
echo Codex prompts created successfully inside your project!
echo.

pause