"use strict";
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        "Products",
        {
            name: DataTypes.STRING,
            categoriesId: DataTypes.INTEGER,
            picture: DataTypes.STRING,
            price: DataTypes.INTEGER,
            description: DataTypes.STRING,
            detail: DataTypes.STRING,
            order_time: DataTypes.INTEGER
        },
        {}
    );
    Products.associate = function (models) {
        // associations can be defined here
    };
    return Products;
};
