'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('oder_details', [{
      orderId: 1,
      price: 20,
      createAt :new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oder_details', null, {});
  }
};