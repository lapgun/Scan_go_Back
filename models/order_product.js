'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_product = sequelize.define('Order_product', {
    name: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    order_price: DataTypes.INTEGER
  }, {});
  Order_product.associate = function(models) {
    // associations can be defined here
  };
  return Order_product;
};