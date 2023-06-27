import { userController } from '../controllers';
import authMiddleware from '../middlewares/auth-middleware';

const Router = require('express').Router;
const UsersRouter = new Router();

UsersRouter.get('/', authMiddleware, userController.getUsers);

export default UsersRouter;
