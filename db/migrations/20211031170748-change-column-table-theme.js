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
        queryInterface.changeColumn('themes', 'theme_title', {
          type: Sequelize.STRING,
          // defaultValue: 1,
        }),
        queryInterface.addColumn('themes', 'theme_cover', {
          type: Sequelize.STRING,
          after: "theme_title",
          allowNull: false,
        }, { transaction: t }),
        queryInterface.addColumn('themes', 'theme_detail', {
          type: Sequelize.STRING,
          after: "theme_cover",
          allowNull: true,
        })

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
