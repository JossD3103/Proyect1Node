import nodemailer from 'nodemailer'

const emailRegister = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { name, email, token } = datos

  await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Confirma tu Cuenta en BienesRaices.com',
    text: 'Confirma tu Cuenta en BienesRaices.com',
    html: `
      <p>Hola ${name}, comprueba tu cuenta en BienesRaices.com</p>
      <p>Tu cuenta ya esta lista, solo debes confirmarla en el sigueinte enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/verify/${token}">Confirmar Cuenta</a></p>
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      
    `
  })
}

const emailForgotPassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { name, email, token } = datos

  await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Reestablece tu Password en BienesRaices.com',
    text: 'Reestablece tu Password en BienesRaices.com',
    html: `
      <p>Hola ${name}, has solicitado reestablecer tu password en BienesRaices.com</p>
      <p>Sigue el siguiente enlace para generar un password nuevo: 
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/forgot-password/${token}">Reestablecer Password</a>
      </p>
      <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
      
    `
  })
}

export {
  emailRegister,
  emailForgotPassword,

}