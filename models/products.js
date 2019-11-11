'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    name: DataTypes.STRING,
    categoriesId: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    detail: DataTypes.STRING,
    order_time: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};