'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comment: DataTypes.STRING,
        parentId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {});
    Comment.associate = function(models) {
        Comment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
    };
    return Comment;
};