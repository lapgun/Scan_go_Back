'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [{
      customerId: 1,
      order_status: 'thanh cong',
      total_price: 123,
      createdAt :new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
