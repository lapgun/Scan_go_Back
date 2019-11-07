"use strict";
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      name: DataTypes.STRING,
      cat_parent: DataTypes.INTEGER
    },
    {}
  );
  Categories.associate = function(models) {
    // associations can be defined here
  };
  return Categories;
};
