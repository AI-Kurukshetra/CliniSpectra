import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    {
      error: message,
      details,
    },
    { status },
  );
}

export function parseIntegerParam(
  value: string | null,
  fallback: number,
  min = 0,
  max = 100,
) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

export function handleRouteError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError("Invalid request payload.", 400, error.flatten());
  }

  console.error("API route error", error);

  if (error instanceof Error) {
    return jsonError("Internal server error.", 500);
  }

  return jsonError("Unexpected server error.", 500);
}
