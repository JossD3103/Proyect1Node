import express from 'express'
import { 
  formLogin,
  formRegister,
  register,
  formForgotPassword,
} from '../controllers/userController.js';


const router = express.Router();

//Routing
router.get('/login', formLogin);

router.get('/register', formRegister)
router.post('/register', register)

router.get('/forgot-password', formForgotPassword)

export default router
