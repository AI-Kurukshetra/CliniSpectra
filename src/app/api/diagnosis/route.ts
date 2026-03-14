import { NextRequest, NextResponse } from "next/server";

import { handleRouteError, jsonError } from "@/lib/api";
import { getOpenAIClient } from "@/lib/openai/client";
import { diagnosisRequestSchema } from "@/lib/validators/clinical";

type RefusalContent = {
  type: "refusal";
  refusal: string;
};

const diagnosisResponseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["diagnoses", "triage", "disclaimer"],
  properties: {
    diagnoses: {
      type: "array",
      minItems: 1,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "likelihood", "rationale", "recommended_next_steps"],
        properties: {
          name: {
            type: "string",
          },
          likelihood: {
            type: "number",
            minimum: 0,
            maximum: 1,
          },
          rationale: {
            type: "string",
          },
          recommended_next_steps: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
    triage: {
      type: "string",
      enum: ["low", "moderate", "high", "emergent"],
    },
    disclaimer: {
      type: "string",
    },
  },
} as const;

function isRefusalContent(value: unknown): value is RefusalContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as {
    type?: unknown;
    refusal?: unknown;
  };

  return candidate.type === "refusal" && typeof candidate.refusal === "string";
}

export async function POST(request: NextRequest) {
  try {
    const payload = diagnosisRequestSchema.parse(await request.json());

    const openai = getOpenAIClient();
    const model = process.env.OPENAI_DIAGNOSIS_MODEL ?? "gpt-5-mini";

    const response = await openai.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "You are a clinical decision support assistant.",
                "Return possible differential diagnoses ranked by likelihood.",
                "Be cautious, do not claim certainty, and avoid inventing unavailable facts.",
                "Use only the supplied symptoms and history.",
                "Always include a brief disclaimer that this is not a confirmed medical diagnosis.",
                "Use triage=emergent only when the presentation could require immediate emergency evaluation.",
              ].join(" "),
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(
                {
                  symptoms: payload.symptoms,
                  patient_history: payload.patientHistory,
                  age: payload.age ?? null,
                  sex: payload.sex ?? null,
                  max_diagnoses: payload.maxDiagnoses ?? 5,
                },
                null,
                2,
              ),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "differential_diagnosis",
          strict: true,
          schema: diagnosisResponseSchema,
        },
      },
    });

    const refusal = response.output
      .map((item) => {
        if (!("content" in item) || !Array.isArray(item.content)) {
          return undefined;
        }

        return item.content.find(isRefusalContent);
      })
      .find((item) => item !== undefined);

    if (refusal?.type === "refusal") {
      return jsonError(refusal.refusal, 422);
    }

    if (!response.output_text) {
      return jsonError("The diagnosis model returned an empty response.", 502);
    }

    const result = JSON.parse(response.output_text) as {
      diagnoses: Array<{
        name: string;
        likelihood: number;
        rationale: string;
        recommended_next_steps: string[];
      }>;
      triage: "low" | "moderate" | "high" | "emergent";
      disclaimer: string;
    };

    const diagnoses = [...result.diagnoses]
      .sort((left, right) => right.likelihood - left.likelihood)
      .slice(0, payload.maxDiagnoses ?? 5);

    return NextResponse.json({
      data: {
        symptoms: payload.symptoms,
        patientHistory: payload.patientHistory,
        age: payload.age ?? null,
        sex: payload.sex ?? null,
        triage: result.triage,
        disclaimer: result.disclaimer,
        diagnoses,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
