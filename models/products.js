"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Products",
    {
      name: { type: DataTypes.STRING, validate: { notEmpty: true } },
      categoriesId: { type: DataTypes.INTEGER, validate: { notEmpty: true } },
      picture: { type: DataTypes.STRING, validate: { notEmpty: true } },
      price: { type: DataTypes.INTEGER, validate: { notEmpty: true } },
      description: { type: DataTypes.STRING, validate: { notEmpty: true } },
      detail: { type: DataTypes.STRING, validate: { notEmpty: true } },
      quantity: { type: DataTypes.INTEGER },
      order_time: { type: DataTypes.STRING }
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.product_image, {
      foreignKey: "picture",
      sourceKey: "id",
      as: "images"
    });
    Product.hasMany(models.Comment, {
      foreignKey: "productId",
      sourceKey: "id",
      as: "comments"
    });
    Product.belongsTo(models.Categories, {
      foreignKey: "categoriesId",
      sourceKey: "id",
      as: "categories"
    });
  };
  return Product;
};
