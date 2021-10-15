'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('Organizations', 'package', {
          type: Sequelize.STRING,
          references: {
            model: 'packages', // name of Target model
            key: 'package_id', // key in Target model that we're referencing
          },
          allowNull: false,
        }, {
          defaultValue: null,

        }),
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
  }
};
