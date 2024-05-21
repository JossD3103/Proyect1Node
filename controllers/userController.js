import { check, validationResult } from "express-validator"
import User from "../models/User.js"
import { generateId } from "../helpers/tokens.js"
import { render } from "pug"

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
  await check('name').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
  await check('email').isEmail().withMessage('Eso no parece un email').run(req)
  await check('password').isLength({ min: 6}).withMessage('El password debe ser de por lo menos 6 caracteres').run(req)
  await check('repetir_password').custom((value, { req }) => value === req.body.password).withMessage('Los password no son iguales').run(req)

  let response = validationResult(req)

  //Verificar Validacion
  if(!response.isEmpty()){ 
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: response.array(),
      user: {
        name: req.body.name,
        email: req.body.email,
      }
    })
  } 

  const { name, email, password } = req.body

  const existUser = await User.findOne( { where : { email } } )
  if(existUser){
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: [{msg: 'El Usuario ya esta registrado'}],
      user: {
        name: req.body.name,
        email: req.body.email,
      }
    })
  }

  //almacenar un usuario
  await User.create({
    name,
    email,
    password,
    token: generateId()
  })

  //mostrar mensaje de comfirmacion
  res,render('templates/mesage', {
    page: 'Cuenta Creada Correctamente',
    mesage: 'Hemos Enviado un Email de Confirmacion, presiona en el enlace'
  })

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