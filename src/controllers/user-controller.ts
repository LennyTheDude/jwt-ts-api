import { Request, Response, NextFunction } from 'express';

import { userService } from '../services';
const { validationResult } = require('express-validator');
const AuthError = require('../errors/auth-error');

class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(AuthError.BadRequest('Validation error', errors.array()));
            const { email, password } = req.body;
            const userData = await userService.signup(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            const token = await userService.logout(refreshToken);
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body; // change token from localstorage here
            const userData = await userService.refresh(refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
