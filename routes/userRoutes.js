import { Router } from 'express';
import { register, getProfile, logout, login } from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/register', register);
router.post('/loin', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);

export default router;