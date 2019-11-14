'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define('product_image', {
    image_1: DataTypes.STRING,
    image_2: DataTypes.STRING,
    image_3: DataTypes.STRING,
    image_4: DataTypes.STRING,
    image_5: DataTypes.STRING,
    default_image: DataTypes.STRING
  }, {});
  product_image.associate = function(models) {
    // associations can be defined here
  };
  return product_image;
};