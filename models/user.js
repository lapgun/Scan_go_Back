"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      role: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 2
        }
      }
    },
    {}
  );
  User.associate = function(models) {};
  return User;
};
// if(role == 0){
// cút
// }
// if(role== 1){
// đc xóa thằng 0
//   ko đc xóa thằng 1 khác
//   ko đc làm gì thằng 2
// }
// if(role==2){
//   làm gì cũng đc
// }
