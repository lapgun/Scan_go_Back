'use strict';
module.exports = (sequelize, DataTypes) => {
  const gallery_products = sequelize.define('gallery_products', {
    nameImg: DataTypes.STRING,
    productId: DataTypes.STRING,
    local : DataTypes.STRING,
  }, {});
  gallery_products.associate = function(models) {
    gallery_products.belongsTo(models.Products,{foreignKey: 'productId', targetKey: 'id', as:'gallery'})
  };
  return gallery_products;
};