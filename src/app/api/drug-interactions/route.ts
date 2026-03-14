import { NextRequest, NextResponse } from "next/server";

import { handleRouteError, jsonError } from "@/lib/api";
import {
  checkDrugInteractions,
  type MedicationInput,
} from "@/lib/drug-interactions";
import { createSupabaseServerClient } from "@/lib/supdabase";
import { drugInteractionRequestSchema } from "@/lib/validators/clinical";

async function getPatientMedications(patientId: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("medications")
    .select("medication_name, dosage, route, frequency, is_active")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as MedicationInput[];
}

export async function POST(request: NextRequest) {
  try {
    const payload = drugInteractionRequestSchema.parse(await request.json());

    const medications =
      payload.medications ??
      (payload.patientId
        ? await getPatientMedications(payload.patientId)
        : undefined);

    if (!medications?.length) {
      return jsonError("No medications found for interaction checking.", 404);
    }

    const result = checkDrugInteractions(medications);

    return NextResponse.json({
      data: {
        patientId: payload.patientId ?? null,
        medications,
        ...result,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
