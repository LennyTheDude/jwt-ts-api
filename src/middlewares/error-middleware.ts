import { Request, Response, NextFunction } from 'express';
import AuthError from '../errors/auth-error';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    if (err instanceof AuthError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unknown error.' });
}
