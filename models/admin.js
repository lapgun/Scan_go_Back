"use strict";
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      name: {
         type : DataTypes.STRING, 
         validate : {len: [2,10]}
      },
      password: {
        type : DataTypes.STRING
        // validate : { isEmail:true}
      },
      email: {
        type : DataTypes.STRING
        // validate : { min : -90, max: 90}
      },
      role: {
        type :DataTypes.BOOLEAN,
        defaultValue : true,
      }
    }
    ,
    {
      validate : {
        bothCoordsOrNone: function() {
          if ((this.name === null) !== (this.email === null) !==(this.password===null)) {
            throw new Error('Require name or email or password')
          }
        }
      }
    }
  );
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};
