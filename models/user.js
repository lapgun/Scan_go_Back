"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            address: DataTypes.STRING,
            role: DataTypes.BOOLEAN
        }, {}
    );
    User.associate = function(models) {
        User.hasMany(models.Comment, { foreignKey: 'userId', sourceKey: 'id', as: 'comments' });
    };
    return User;
};