import { check, validationResult } from "express-validator"
import User from "../models/User.js"

const formLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesion'
  })
}

const formRegister = (req, res) => {
  res.render('auth/register', {
    page: 'Crear Cuenta'
  })
}

const register = async (req, res) => {
  //validation
  await check('name').notEmpty().run(req)

  const user = await User.create(req.body)
  res.json(user)
}

const formForgotPassword= (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recupera tu acceso a Bienes Raices'
  })
}

export {
  formLogin,
  formRegister,
  formForgotPassword,
  register
}