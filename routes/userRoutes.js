import express from 'express'
import { 
  formLogin,
  formRegister,
  register,
  formForgotPassword,
  verify,
  resetPassword,
  proveToken,
  newPassword,
  authenticate,
} from '../controllers/userController.js';


const router = express.Router();

//Routing
router.get('/login', formLogin);
router.post('/login', authenticate);

router.get('/register', formRegister)
router.post('/register', register)

router.get ('/verify/:token', verify)

router.get('/forgot-password', formForgotPassword)
router.post('/forgot-password', resetPassword)

//almacena el nuevo password
router.get('/forgot-password/:token', proveToken)
router.post('/forgot-password/:token', newPassword)

export default router
