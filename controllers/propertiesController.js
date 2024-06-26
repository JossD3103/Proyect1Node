import Price from '../models/Price.js'
import Category from '../models/Category.js'

const admin = (req, res) => {
  res.render('properties/admin', {
    page: 'Mis propiedades',
    nav: true,
  })
}

const create = async (req, res) => {
  //consultar modelo
  const [] = await Promise.all([])
  res.render('properties/create', {
    page: 'Crear Propiedad',
    nav: true,
  })
}

export {
  admin,
  create
}