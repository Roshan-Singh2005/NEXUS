import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function generateTextFromPrompt(prompt: string) {
    const text = await generateText({
        model: google("gemini-3.5-flash-lite"),
        prompt,
    });
    return text;
}