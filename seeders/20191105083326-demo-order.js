'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('oders', [{
      customerId: 1,
      order_status: 'thanh cong',
      total_price: 123,
      createAt :new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oders', null, {});
  }
};
