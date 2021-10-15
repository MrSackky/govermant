'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //    return queryInterface.sequelize.transaction((t) => {
    //     return Promise.all([
    //         queryInterface.addColumn('table_name', 'field_one_name', {
    //             type: Sequelize.STRING
    //         }, { transaction: t }),
    //         queryInterface.addColumn('table_name', 'field_two_name', {
    //             type: Sequelize.STRING,
    //         }, { transaction: t })
    //     ])
    // })
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('users', 'password', {
          type: Sequelize.STRING,
          after: "id"
        }, { transaction: t })
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //    return Promise.all([
    //     queryInterface.removeColumn('table_name', 'field_one_name', { transaction: t }),
    //     queryInterface.removeColumn('table_name', 'field_two_name', { transaction: t })
    // ])
    return Promise.all([
      queryInterface.removeColumn('users', 'password')
    ])
  }
};
