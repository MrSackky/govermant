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
    // return queryInterface.bulkInsert('packages', [
    //   {
    //     package_id: 1,
    //     code_package: 'GOV-F-001',
    //     name_package: 'Free Package',
    //     size_limit: '52428800',
    //   },
    //   {
    //     package_id: 2,
    //     code_package: 'GOV-C-001',
    //     name_package: 'Connect Package',
    //     size_limit: '524288000',
    //   },
    //   {
    //     package_id: 3,
    //     code_package: 'GOV-S-001',
    //     name_package: 'Standard',
    //     size_limit: '4294967296',
    //   },
    //   {
    //     package_id: 4,
    //     code_package: 'GOV-P-001',
    //     name_package: 'Premium Package',
    //     size_limit: '-1',
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
    return queryInterface.bulkDelete('packages', null, {});
  },
};
