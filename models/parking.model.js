module.exports = (sequelize, Sequelize) => {
    const Parking = sequelize.define("parking", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            default: null
        },
        nom: {
            type: Sequelize.STRING
        },
        commune: {
            type: Sequelize.STRING
        },
        Longitude:{
            type: Sequelize.FLOAT
        },
        Latitude:{
            type: Sequelize.FLOAT
        },
        taille:{
            type: Sequelize.INTEGER,
        },
        placeOcc:{
            type: Sequelize.INTEGER,
        },
        image:{
            type: Sequelize.TEXT,
        },
        prix:{
            type: Sequelize.INTEGER,
        },
        tempsOuv:{
            type: Sequelize.STRING,
        },
        tempsFerm:{
            type: Sequelize.STRING,
        },
        duree:{
            type: Sequelize.DOUBLE,
        }

    });
    return Parking;
  };
