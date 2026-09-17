import {Router} from 'express';
import {Request, Response} from 'express';
import {prisma} from '../db/prisma';
import {generateTextFromPrompt} from '../services/ai';

export const chatRouter = Router();

chatRouter.post("/", async (req: Request, res: Response) => {

    const{prompt}= req.body
    const response = await generateTextFromPrompt(prompt);

    return res.status(200).json({response});

})