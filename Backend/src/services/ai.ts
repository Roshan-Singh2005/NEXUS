import { google } from "@ai-sdk/google";
import { generateText } from "ai";


export async function generate(prompt: string) {
  const text = await generateText({
    model: google("gemini-3-flash-preview"),
    prompt,
    maxOutputTokens: 1000,
  });

  return text;
}