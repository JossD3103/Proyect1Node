import express from 'express'
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js'

const app = express()

//habilitar lectura de formularios
app.use( express.urlencoded({extended: true}) )

//conexion a la base de datos
try {
  await db.authenticate();
  db.sync()
  console.log('Conexion Correcta');
} catch (error) {
  console.log(error);
}

//habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Public
app.use( express.static('public') )

//routing
app.use('/auth', userRoutes)

//Definir el puerto
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta fincionando en el puerto ${port}`);
})