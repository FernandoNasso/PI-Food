const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Diets = sequelize.define('diets', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegura que no haya nombres de dieta duplicados
    },
  }, { timestamps: false });

  return Diets;
};

