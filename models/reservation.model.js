const { Sequelize, DataTypes} = require('Sequelize');
module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservation", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            default: null
        },
        tempsDebut:{
            type : Sequelize.STRING
        },
        tempsFin:{
            type : Sequelize.STRING
        },
        numeroPlace:{
            type: Sequelize.INTEGER
        },
        montant:{
            type:Sequelize.INTEGER
        }
    });
    return Reservation;
  };
