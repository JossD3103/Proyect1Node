import { validationResult } from 'express-validator'
import { Category, Price, Property } from '../models/tables.js'

const admin = (req, res) => {
  res.render('properties/admin', {
    page: 'Mis propiedades',
    nav: true,
  })
}

const create = async (req, res) => {
  //consultar modelo
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ])

  res.render('properties/create', {
    page: 'Crear Propiedad',
    nav: true,
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: {},
  })
}

const saved = async (req, res) => {
  //Validacion 
  let result = validationResult(req)

  if(!result.isEmpty()){

    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll()
    ])

    return res.render('properties/create', {
      page: 'Crear Propiedad',
      nav: true,
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body
    })
  }
  //Crear un Registro
  const { title, description, rooms, parking, wc, street, lat, lng, price: precioId, category: categoryId } = req.body
  try {
    const propertiySaved = await Property.create({
      title,
      description,
      rooms,
      parking,
      wc,
      street,
      lat,
      lng,
      precioId,
      categoryId,
      
    })
  } catch (error) {
    console.log(error);
  }
}

export {
  admin,
  create,
  saved,
}