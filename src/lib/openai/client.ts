import "server-only";

import OpenAI from "openai";

import { getServerEnv } from "@/lib/env";

let openaiClient: OpenAI | undefined;

export function getOpenAIClient() {
  if (openaiClient) {
    return openaiClient;
  }

  const { OPENAI_API_KEY } = getServerEnv();

  openaiClient = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  return openaiClient;
}
