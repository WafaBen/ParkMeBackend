const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.parking = require("./parking.model.js")(sequelize, Sequelize);
db.reservation = require("./reservation.model")(sequelize, Sequelize);

//-----------
// Relations
//-----------

db.parking.hasMany(db.reservation, {foreignKey: 'idPark'}); 
db.reservation.belongsTo(db.parking, {foreignKey: 'idPark'});

db.user.hasMany(db.reservation, {foreignKey: 'idUser'}); 
db.reservation.belongsTo(db.user, {foreignKey: 'idUser'});

module.exports = db;