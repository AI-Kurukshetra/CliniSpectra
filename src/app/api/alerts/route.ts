import { NextRequest, NextResponse } from "next/server";

import { handleRouteError, parseIntegerParam } from "@/lib/api";
import { createSupabaseServerClient } from "@/lib/supdabase";
import { alertCreateSchema } from "@/lib/validators/clinical";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const patientId = searchParams.get("patientId");
    const status = searchParams.get("status");
    const limit = parseIntegerParam(searchParams.get("limit"), 20, 1, 100);
    const offset = parseIntegerParam(searchParams.get("offset"), 0, 0, 1000);

    const supabase = createSupabaseServerClient();
    let query = supabase
      .from("alerts")
      .select("*")
      .order("triggered_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (patientId) {
      query = query.eq("patient_id", patientId);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = alertCreateSchema.parse(await request.json());
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("alerts")
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
