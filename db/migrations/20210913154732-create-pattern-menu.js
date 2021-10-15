'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pattern_menu', {

      pattern_menu_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pattern_title: {
        type: Sequelize.STRING
      },
      is_show: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE
      },
      date_updated: {
        type: Sequelize.DATE
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pattern_menu');
  }
};