'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // return queryInterface.bulkInsert('Users', [
    //   {
    //     user_name: 'ictintegrator.co@gmail.com',
    //     password: '$2a$10$Ka27MUyopBvKtF34GgP1VevM6tOcpfVeiqXp5xb0F3PfT09yfiOvO',
    //     name_user: 'Admin ICTI',
    //     organization_id: 0,
    //     email_user:'ictintegrator.co@gmail.com', 
    //     phone_user: '0652659288',
    //     date_created: new Date(),
    //     date_updated: new Date(),
    //     status_active: 1,
    //     type_user: 1
    //   },
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
