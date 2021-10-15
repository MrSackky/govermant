'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('activities', {
      activities_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      activities_date: {
        type: Sequelize.DATE
      },
      activities_title: {
        type: Sequelize.STRING
      },
      activities_detail: {
        type: Sequelize.TEXT
      },
      activities_image: {
        type: Sequelize.STRING
      },
      activities_keyword: {
        type: Sequelize.TEXT
      },
      is_slide: {
        type: Sequelize.INTEGER
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      date_update: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status_active: {
        type: Sequelize.INTEGER
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('activities');
  }
};