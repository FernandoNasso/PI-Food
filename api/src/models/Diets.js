const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Diets = sequelize.define('diets', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true         
       },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    }, { timestamps: false }
  );
};