import { Router } from 'express';
import { signIn, signUp, verifyToken } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/auth.js';
export var authRouter = Router();
authRouter.post('/signUp', signUp);
authRouter.post('/signIn', signIn);
authRouter.post('/verifyToken', authenticateUser, verifyToken);
