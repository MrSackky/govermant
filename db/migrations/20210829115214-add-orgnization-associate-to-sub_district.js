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
        queryInterface.changeColumn('Organizations', 'organization_sub_district_id', {
          type: Sequelize.STRING,
          references: {
            model: 'Sub_districts', // name of Target model
            key: 'sub_district_id', // key in Target model that we're referencing
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
