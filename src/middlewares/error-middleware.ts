import { Request, Response } from 'express';
import AuthError from '../errors/auth-error';
import { Logging } from '../config/Logging';

export default function (err: unknown, req: Request, res: Response) {
    Logging.error('Auth', err);
    if (err instanceof AuthError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Unknown error.' });
}
