'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
           Cook.belongsTo(models.User, { foreignKey: 'providerId', as: 'provider' });
    }
  }
  Cook.init({
    name: DataTypes.STRING,
    experience_years: DataTypes.INTEGER,
    specialties: DataTypes.STRING,
    daily_rate: DataTypes.FLOAT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cook',
  });
  return Cook;
};