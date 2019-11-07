'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.BOOLEAN
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};