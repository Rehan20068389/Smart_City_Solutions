//Referance from chatgpt
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Car, { foreignKey: 'providerId', as: 'cars' });//
      User.hasMany(models.Cook, { foreignKey: 'providerId', as: 'cooks' });//
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      //  NEW FIELD ADDED
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",   // user = normal user,  provider = service provider
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
