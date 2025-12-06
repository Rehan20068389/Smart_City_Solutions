'use strict';
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    model: DataTypes.STRING,
    type: DataTypes.STRING,
    with_driver: DataTypes.BOOLEAN,
    price_per_day: DataTypes.FLOAT,
    location: DataTypes.STRING,
    providerId: DataTypes.INTEGER   // keep camelCase — matches your DB
  }, {});
  Car.associate = function(models) {
    Car.belongsTo(models.User, { foreignKey: 'providerId', as: 'provider' });
  };
  return Car;
};
