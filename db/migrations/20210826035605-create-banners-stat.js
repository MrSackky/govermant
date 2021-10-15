'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('banners_stats', {
      stat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      banner_id: {
        type: Sequelize.INTEGER
      },
      stat_os: {
        type: Sequelize.TEXT
      },
      stat_browser: {
        type: Sequelize.TEXT
      },
      stat_user_agent: {
        type: Sequelize.TEXT
      },
      date_create: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      date_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ip: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('banners_stats');
  }
};