import { userController } from '../controllers';
import authMiddleware from '../middlewares/auth-middleware';
import express from 'express';

// import Router = require('express').Router;
const UsersRouter: express.Router = express.Router();

UsersRouter.get('/', authMiddleware, userController.getUsers);

export default UsersRouter;
