import { exit } from 'node:process'
import categories from './categories.js'
import Category from '../models/Category.js'
import prices from './prices.js'
import Price from '../models/Price.js'
import db from '../config/db.js'
import { truncate } from 'node:fs'

const importData = async () => {
  try {
  // Autenticar
  await db.authenticate()

  //Generar las columnas
  await db.sync()

  //Insertar los Datos
  await Promise.all([
    Category.bulkCreate(categories),
    Price.bulkCreate(prices)
  ]);
  console.log('Datos Importados Correctamente');
  exit()
  
  } catch (error) {
    console.log(error);
    exit(1)
  }
}

const deleteData = async () => {
  try {
    await Promise.all([
      Category.destroy({where: {}, truncate: true}),
      Price.destroy({where: {}, truncate: true})
    ]);
    console.log('Datos Eliminados Correctamente');
    exit()
    
  } catch (error) {
    console.log(error);
    exit(1)
  }
} 

if(process.argv[2] === "-i"){
  importData();
}
if(process.argv[2] === "-e"){
  deleteData();
}