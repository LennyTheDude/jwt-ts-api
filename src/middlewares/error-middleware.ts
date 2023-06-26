import { Request, Response, NextFunction } from 'express';
import AuthError from '../errors/auth-error';
import { Logging } from '../config/Logging';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
    Logging.error('Auth', err);
    if (err instanceof AuthError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unknown error.' });
}
