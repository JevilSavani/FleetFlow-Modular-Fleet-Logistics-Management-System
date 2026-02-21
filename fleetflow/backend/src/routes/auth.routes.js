import express from 'express';
import {
    login,
    logout,
    forgotPassword,
    resetPassword,
    getCurrentUser
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', authenticate, getCurrentUser);

export default router;
