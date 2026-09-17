export {Request, Response} from 'express';

declare global {
    namespace Express {
        export interface Request {
            userId: string;
        }
    }
}