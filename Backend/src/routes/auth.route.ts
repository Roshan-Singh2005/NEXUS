import {Router} from 'express';
import {Request, Response} from 'express';
import {loginSchema, registerSchema} from '../schema/auth.schema';
import bcrypt from 'bcrypt';
import {prisma} from '../db/prisma';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../lib/constants';


export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const decoded = registerSchema.safeParse(req.body);
    if (!decoded.success) {
        return res.status(400).json({message: "Invalid data"});
}
const {name, email, password}:any = decoded.data;

try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password : hashedPassword,
    },
    });

    const token = jwt.sign({userId: user.id}, JWT_SECRET as string);
    res.cookie("token", token);

    res.status(201).json({message: "User created successfully", user});
}catch(error){
    res.status(500).json({message: "Internal server error"});
}
});

authRouter.post("/login", async (req: Request, res: Response) => {
    const decoded = loginSchema.safeParse(req.body);
    if (!decoded.success) {
        return res.status(400).json({message: "Invalid data"});
}
const {email, password}:any = decoded.data;

try{
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({userId: user.id}, JWT_SECRET as string);
    res.cookie("token", token);
    return res.status(200).json({ user: user.name, token });
} catch (error) {
    res.status(500).json({message: "Internal server error"});
}
});