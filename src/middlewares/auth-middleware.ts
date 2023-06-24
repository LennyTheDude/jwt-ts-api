import { Request, Response, NextFunction } from 'express';
import AuthError from '../errors/auth-error';
import tokenService from '../services/token-service';

interface IUserRequest extends Request {
    user: any;
}

export default function (req: IUserRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(AuthError.UnauthorizedError());
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(AuthError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(AuthError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        next(AuthError.UnauthorizedError());
    }
}
