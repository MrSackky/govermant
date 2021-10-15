'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('information', {
      infor_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.DATE
      },
      infor_date: {
        type: Sequelize.DATE
      },
      infor_title: {
        type: Sequelize.STRING
      },
      infor_detail: {
        type: Sequelize.TEXT
      },
      infor_image: {
        type: Sequelize.STRING
      },
      infor_keyword: {
        type: Sequelize.TEXT
      },
      infor_view: {
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
    await queryInterface.dropTable('information');
  }
};