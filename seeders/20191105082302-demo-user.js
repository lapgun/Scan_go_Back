'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'John',
      email: 'demo@demo.com',
      password: 'demo@demo.com',
      address : 'ha noi',
      role: 1,
      createdAt :new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
