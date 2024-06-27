import express from 'express'
import { body } from 'express-validator';
import {
  admin,
  create,
  saved
} from '../controllers/propertiesController.js'

const router = express.Router();

router.get('/my-properties', admin)
router.get('/properties/create', create)
router.post('/properties/create', 
  body('title').notEmpty().withMessage('El Titulo del Anuncio es Obligatorio'),
  body('description')
    .notEmpty().withMessage('La Descripcion no puede ir vacia')
    .isLength({max: 200}).withMessage('La descripcion es muy larga'),
  body('category').isNumeric().withMessage('Selecciona una categoria'),
  body('price').isNumeric().withMessage('Selecciona un rango de precios'),
  body('rooms').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
  body('parking').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
  body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
  body('lat').notEmpty().withMessage('Ubica la propiedad en el Mapa'),
  saved
)

export default router