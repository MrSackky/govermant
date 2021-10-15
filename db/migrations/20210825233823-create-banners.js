'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('banners', {
      banner_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      banner_title: {
        type: Sequelize.STRING
      },
      banner_image: {
        type: Sequelize.STRING
      },
      banner_link: {
        type: Sequelize.TEXT
      },
      status_active: {
        type: Sequelize.INTEGER
      },
      num_click: {
        type: Sequelize.INTEGER
      },
      date_created: {
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
      seq: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('banners');
  }
};