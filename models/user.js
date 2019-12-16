"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      role: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 2
        }
      }
    },
    {}
  );
  User.associate = function (models) { };
  return User;
};
