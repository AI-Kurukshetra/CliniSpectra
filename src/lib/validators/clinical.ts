import { z } from "zod";

const nullableText = z.string().trim().min(1).nullable().optional();
const nullableDate = z.string().datetime().nullable().optional();

export const patientCreateSchema = z.object({
  mrn: z.string().trim().min(1),
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  date_of_birth: z.string().date().optional(),
  sex: nullableText,
  phone: nullableText,
  email: z.string().email().nullable().optional(),
  address: nullableText,
  emergency_contact_name: nullableText,
  emergency_contact_phone: nullableText,
});

export const patientUpdateSchema = patientCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "At least one field must be provided.",
);

export const encounterCreateSchema = z.object({
  patient_id: z.string().uuid(),
  encounter_type: z.string().trim().min(1),
  encounter_status: z.string().trim().min(1).optional(),
  provider_name: nullableText,
  department: nullableText,
  facility_name: nullableText,
  admission_at: nullableDate,
  discharge_at: nullableDate,
  chief_complaint: nullableText,
  diagnosis: nullableText,
  notes: nullableText,
});

export const encounterUpdateSchema = encounterCreateSchema
  .omit({ patient_id: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export const alertCreateSchema = z.object({
  patient_id: z.string().uuid(),
  encounter_id: z.string().uuid().nullable().optional(),
  risk_score_id: z.string().uuid().nullable().optional(),
  alert_type: z.string().trim().min(1),
  severity: z.string().trim().min(1),
  status: z.string().trim().min(1).optional(),
  title: z.string().trim().min(1),
  message: nullableText,
  triggered_at: nullableDate,
  acknowledged_at: nullableDate,
  resolved_at: nullableDate,
});

export const alertUpdateSchema = alertCreateSchema
  .omit({ patient_id: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });

export const diagnosisRequestSchema = z.object({
  symptoms: z
    .union([z.string().trim().min(1), z.array(z.string().trim().min(1)).min(1)])
    .transform((value) =>
      typeof value === "string" ? [value] : value,
    ),
  patientHistory: z.string().trim().min(1),
  age: z.number().int().min(0).max(130).optional(),
  sex: z.string().trim().min(1).optional(),
  maxDiagnoses: z.number().int().min(1).max(10).optional(),
});

export const drugInteractionMedicationSchema = z.object({
  medication_name: z.string().trim().min(1),
  dosage: nullableText,
  route: nullableText,
  frequency: nullableText,
  is_active: z.boolean().optional(),
});

export const drugInteractionRequestSchema = z
  .object({
    patientId: z.string().uuid().optional(),
    medications: z.array(drugInteractionMedicationSchema).min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.patientId && !value.medications?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either patientId or medications.",
        path: ["patientId"],
      });
    }
  });
