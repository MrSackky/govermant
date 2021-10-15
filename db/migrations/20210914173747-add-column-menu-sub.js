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
        queryInterface.addColumn('Menu_sub', 'pattern_menu', {
          type: Sequelize.INTEGER,
          after: "is_show",
          allowNull: true,
        }, { transaction: t }),
        queryInterface.addColumn('Menu_sub', 'is_pattern_menu', {
          type: Sequelize.INTEGER,
          after: "is_show",
          allowNull: true,
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
  }
};
