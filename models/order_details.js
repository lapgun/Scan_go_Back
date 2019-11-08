"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order_details = sequelize.define(
    "Order_details",
    {
      orderId: DataTypes.INTEGER,
      price: DataTypes.INTEGER
    },
    {}
  );
  Order_details.associate = function(models) {
    // associations can be defined here
  };
  return Order_details;
};
