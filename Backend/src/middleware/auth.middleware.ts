import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../lib/constants';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
try{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const decoded = jwt.verify(token, JWT_SECRET as string) as {userId: string};
    req.userId = decoded.userId;
    next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
};
 