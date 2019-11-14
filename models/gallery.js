'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    name: DataTypes.STRING
  }, {});
  Gallery.associate = function(models) {
  };
  return Gallery;
};