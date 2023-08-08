const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Importa la función v4 de uuid

module.exports = (sequelize) => {
  const Recipe = sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, // Cambia el tipo a UUID
      defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, { 
    timestamps: false,
  });

  return Recipe;
};

