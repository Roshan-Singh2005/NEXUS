import { Request, Response } from "express";
import { Router } from "express";
import { prisma } from "../lib/db";
import { chatSchema } from "../schema/chat.schema";
import { generate } from "../services/ai";
import { INSTRUCTION } from "../lib/constants";

export const chatRouter = Router();

chatRouter.post("/", async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const parsed = chatSchema.safeParse({ prompt });
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.message });
  }
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const pastConversations = await prisma.pastConversation.findMany({
      where: {
        userId: userId,
      },
    });

    const pastConversationsText = pastConversations.map((conversation) => {
      return conversation.prompt;
    });

    const cleanPrompt = `${INSTRUCTION}\n\n${prompt}{} this is the users past history - \n\n${pastConversationsText}`;
    const result = await generate(cleanPrompt);

    if (!result.content) {
      return res.status(400).json({ message: "Failed to generate text" });
    }

    const cleanText = Array.isArray(result.content)
      ? result.content
          .filter((part: any) => part.type === "text")
          .map((part: any) => part.text)
          .join("")
      : typeof result.text === "string"
        ? result.text
        : "";

    const cleanedResponse = cleanText
      .replace(/[*_#`~>]/g, "")
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\t/g, " ")
      .replace(/\s+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const conversation = await prisma.pastConversation.create({
      data: {
        prompt,
        userId,
      },
    });

    const message = await prisma.message.create({
      data: {
        prompt,
        userId,
        response: cleanedResponse,
        pastConversationId: conversation.id,
      },
    });

    return res.status(200).json(cleanedResponse);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Failed to generate text", error: e });
  }
});