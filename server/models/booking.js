'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    user_name: DataTypes.STRING,
    service_type: DataTypes.STRING,
    service_id: DataTypes.INTEGER,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    pickup_location: DataTypes.STRING,
    drop_location: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    payment_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};