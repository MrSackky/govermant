'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Menu', {
      menu_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      menu_title: {
        type: Sequelize.STRING
      },
      menu_detail: {
        type: Sequelize.TEXT
      },
      menu_seq: {
        type: Sequelize.INTEGER
      },
      have_sub: {
        type: Sequelize.INTEGER
      },
      is_show: {
        type: Sequelize.INTEGER
      },
      is_primary_menu: {
        type: Sequelize.INTEGER
      },
      is_pattern_menu: {
        type: Sequelize.INTEGER
      },
      pattern_menu: {
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Menu');
  }
};