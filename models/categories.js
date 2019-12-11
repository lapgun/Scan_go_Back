"use strict";
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      cat_parent: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Categories.associate = function(models) {
    Categories.hasMany(models.Products, {
      foreignKey: "categoriesId",
      sourceKey: "id",
      as: "products"
    });
  };
  return Categories;
};
