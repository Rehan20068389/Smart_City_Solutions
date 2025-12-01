//Referance from chatgpt
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here later
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
