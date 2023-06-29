import { Request, Response, NextFunction } from 'express';

import { userService } from '../services';
import { Logging } from '../config/Logging';
import { validationResult } from 'express-validator';
import AuthError from '../errors/auth-error';

class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(AuthError.BadRequest('Validation error', errors.array()));
            const { email, password } = req.body;
            const userData = await userService.signup(email, password);
            Logging.info('Signup', `new user ${email}`);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            Logging.info('Login', `user ${email} logged in`);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            const userId = await userService.logout(refreshToken);
            Logging.info('Logout', `user with id=${userId} logged out`);
            return res.json(userId);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            const email = await userService.activate(activationLink);
            Logging.info('Activation', `account activated for ${email}`);
            return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            const userData = await userService.refresh(refreshToken);
            Logging.info('Refresh', `Token refreshed for ${userData.user.email}`);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            Logging.info('Users', 'Listed all users');
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
