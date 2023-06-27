import { Response, NextFunction } from 'express';
import AuthError from '../errors/auth-error';
import { tokenService } from '../services';
import UserDto from '../dtos/user-dto';
import { IUserRequest } from '../interfaces/user';

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

        req.user = new UserDto(userData);
        next();
    } catch (e) {
        next(AuthError.UnauthorizedError());
    }
}
