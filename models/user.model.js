module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            default: null
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        numTel: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        motPasse: {
            type: Sequelize.STRING
        },
    });
    return User;
  };
