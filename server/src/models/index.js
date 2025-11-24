// referance code from chatgpt
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//importing models
const Car = require('./car')(sequelize, Sequelize.DataTypes);
const Cook = require('./cook')(sequelize, Sequelize.DataTypes);
const Booking = require('./booking')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize, Sequelize.DataTypes);

//associations
Car.hasMany(Booking, { foreignKey: 'service_id', constraints: false, scope: { service_type: 'car' }});
Cook.hasMany(Booking, { foreignKey: 'service_id', constraints: false, scope: { service_type: 'cook' }});
Booking.belongsTo(Car, { foreignKey: 'service_id', constraints: false });
Booking.belongsTo(Cook, { foreignKey: 'service_id', constraints: false });

module.exports = {
  sequelize,
  Car,
  Cook,
  Booking,
  User
};
