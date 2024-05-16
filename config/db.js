import Sequelize from "sequelize";

const db = new Sequelize('josue', 'root', 'root',{
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idke: 10000
  },
  operatorAliases: false
});

export default db;

