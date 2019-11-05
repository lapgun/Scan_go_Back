'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: DataTypes.STRING,
    cat_parent: DataTypes.INTEGER
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};