import { NextRequest, NextResponse } from "next/server";

import { handleRouteError, jsonError } from "@/lib/api";
import { createSupabaseServerClient } from "@/lib/supdabase";
import { alertUpdateSchema } from "@/lib/validators/clinical";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return jsonError("Alert not found.", 404);
    }

    return NextResponse.json({ data });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const payload = alertUpdateSchema.parse(await request.json());
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("alerts")
      .update(payload)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return jsonError("Alert not found.", 404);
    }

    return NextResponse.json({ data });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("alerts")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return jsonError("Alert not found.", 404);
    }

    return NextResponse.json({ data });
  } catch (error) {
    return handleRouteError(error);
  }
}
