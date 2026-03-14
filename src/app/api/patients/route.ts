import { NextRequest, NextResponse } from "next/server";

import { handleRouteError, parseIntegerParam } from "@/lib/api";
import { createSupabaseServerClient } from "@/lib/supdabase";
import { patientCreateSchema } from "@/lib/validators/clinical";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseIntegerParam(searchParams.get("limit"), 20, 1, 100);
    const offset = parseIntegerParam(searchParams.get("offset"), 0, 0, 1000);
    const search = searchParams.get("search")?.trim();

    const supabase = createSupabaseServerClient();
    let query = supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,mrn.ilike.%${search}%`,
      );
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
    const payload = patientCreateSchema.parse(await request.json());
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("patients")
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
