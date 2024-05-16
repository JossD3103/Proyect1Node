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

const formForgotPassword= (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recupera tu acceso a Bienes Raices'
  })
}

export {
  formLogin,
  formRegister,
  formForgotPassword
}