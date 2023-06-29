import { userController } from '../controllers';
import { body } from 'express-validator';
import express from 'express';

const AuthRouter: express.Router = express.Router();

AuthRouter.post('/signup', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.signup);
AuthRouter.post('/login', userController.login);
AuthRouter.post('/logout', userController.logout);
AuthRouter.post('/refresh', userController.refresh);
AuthRouter.get('/activate/:link', userController.activate);

export default AuthRouter;
