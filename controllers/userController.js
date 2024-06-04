import { check, validationResult } from "express-validator"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateId } from "../helpers/tokens.js"
import { 
  emailRegister,
  emailForgotPassword
 } from "../helpers/emails.js"
import { where } from "sequelize"


const formLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesion',
    csrfToken: req.csrfToken(),
  })
}
 
const authenticate = async (req, res) => {
  //Validacion 
  await check('email').isEmail().withMessage('El email es obligatorio').run(req)
  await check('password').notEmpty().withMessage('El password es obligatorio').run(req)

  let response = validationResult(req)

  //Verificar Validacion
  if(!response.isEmpty()){ 
    return res.render('auth/login', {
      page: 'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errors: response.array(),
    })
  } 

  const { email, password } = req.body;

  //comporbar si el usuario existe 
  const user = await User.findOne({ where: { email } })
  if(!user){
    return res.render('auth/login', {
      page: 'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errors: [{msg: 'El Usuario No Existe'}],
    })
  }

  //Comprobar si el usuario esta confirmado 
  if(!user.confirm){
    return res.render('auth/login', {
      page: 'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errors: [{msg: 'Tu cuenta no ha sido confirmada'}],
    })
  }

  //Revisar el password
  
}

const formRegister = (req, res) => {

  res.render('auth/register', {
    page: 'Crear Cuenta',
    csrfToken: req.csrfToken()
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
      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
      errors: [{msg: 'El Usuario ya esta registrado'}],
      user: {
        name: req.body.name,
        email: req.body.email,
      }
    })
  }

  //almacenar un usuario
  const user = await User.create({
    name,
    email,
    password,
    token: generateId()
  })

  //email de confirmacion
  emailRegister({
    name: user.name,
    email: user.email,
    token: user.token
  })

  //mostrar mensaje de comfirmacion
  res.render('templates/mesage', {
    page: 'Cuenta Creada Correctamente',
    mesage: 'Hemos Enviado un Email de Confirmacion, presiona en el enlace'
  })

}

//funcion para comprobar una cuenta 
const verify = async (req, res) => {
  const { token } = req.params;

  //verificar que el usuario sea valido
  const user = await User.findOne({ where: {token} })
  if(!user){
    return res.render('auth/verify-account', {
      page: 'Error al confirmar tu cuenta',
      mesage: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      error: true,
    })
  }
  //confirmar cuenta 
  user.token = null;
  user.confirm = true;
  await user.save();

  res.render('auth/verify-account', {
    page: 'Cuenta Confirmada',
    mesage: 'La cuenta se confirmó correctamente',
  })
}

const formForgotPassword = (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recupera tu acceso a Bienes Raices',
    csrfToken: req.csrfToken(),
  })
}

const resetPassword = async (req, res) => {
  //validation
  await check('email').isEmail().withMessage('Eso no parece un email').run(req)

  let response = validationResult(req)

  //Verificar Validacion
  if(!response.isEmpty()){ 
    return res.render('auth/forgot-password', {
      page: 'Recupera tu acceso a Bienes Raices',
      csrfToken: req.csrfToken(),
      errors: response.array()
    })
  }
  // buscar el usuario
  const { email } = req.body

  const user = await User.findOne({ where: {email} })

  if(!user){
    return res.render('auth/forgot-password', {
      page: 'Recupera tu acceso a Bienes Raices',
      csrfToken: req.csrfToken(),
      errors: [{msg: 'El email no pertenece a ningun usuario'}]
    })
  }

  // generar un token y modificar el password
  user.token = generateId();
  await user.save();
  // enviar email
  emailForgotPassword({
    email: user.email,
    name: user.name,
    token: user.token
  })

  // Renderizar un mensaje 
  res.render('templates/mesage', {
    page: 'Reestablece tu Password',
    mesage: 'Hemos Enviado un Email con las instrucciones'
  })


}

const proveToken = async (req, res) => {
  const { token } = req.params;
  const user =  await User.findOne({ where: {token} })

  if(!user){
    return res.render('auth/verify-account', {
      page: 'Reestablece tu Password',
      mesage: 'Hubo un error al validar tu informacion, intenta de nuevo',
      error: true,
    })
  }

  //mostrar un formulario para que puedas modificar el nuevo password
  res.render('auth/reset-password', {
    page: 'Reestablece Tu Password',
    csrfToken: req.csrfToken()
  })
}
const newPassword = async (req, res) => {
  //validar el password
  await check('password').isLength({ min: 6}).withMessage('El password debe ser de por lo menos 6 caracteres').run(req)
  let response = validationResult(req)

  //Verificar Validacion
  if(!response.isEmpty()){ 
    return res.render('auth/reset-password', {
      page: 'Reestablece tu Password',
      csrfToken: req.csrfToken(),
      errors: response.array(),
    })
  } 
  const { token } = req.params
  const { password } = req.body

  // Identificar quien  have el cambio

  const user =  await User.findOne( { where: { token } } )

  // Hashear el nuevo password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt);
  user.token = null;

  await user.save();
  res.render('auth/verify-account', {
    page: 'Password Reestablecido',
    mesage: 'El Password se guardó correctamente'
  })
}

export {
  formLogin,
  formRegister,
  formForgotPassword,
  verify,
  register,
  resetPassword,
  proveToken,
  newPassword,
  authenticate
}