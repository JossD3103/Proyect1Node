
const admin = (req, res) => {
  res.render('properties/admin', {
    page: 'Mis propiedades',
    nav: true,
  })
}

const create = (req, res) => {
  res.render('properties/create', {
    page: 'Crear Propiedad',
    nav: true,
  })
}

export {
  admin,
  create
}