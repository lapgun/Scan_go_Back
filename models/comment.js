"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 255]
        }
      },
      img: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
          isNumeric: true
        }
      },
      name: DataTypes.STRING,
      productId: DataTypes.INTEGER
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
      as: "user"
    });
    Comment.belongsTo(models.Products, {
      foreignKey: "productId",
      targetKey: "id",
      as: "product"
    })
  };
  return Comment;
};
