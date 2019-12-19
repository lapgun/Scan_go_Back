"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Products", {
    name: { type: DataTypes.STRING },
    categoriesId: { type: DataTypes.INTEGER },
    picture: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
    detail: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER },
    order_time: { type: DataTypes.STRING }
  }, {}
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
