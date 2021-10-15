'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tenders', {
      tender_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      tender_date: {
        type: Sequelize.DATE
      },
      type_tender_id: {
        type: Sequelize.INTEGER
      },
      tender_title: {
        type: Sequelize.STRING
      },
      tender_detail: {
        type: Sequelize.TEXT
      },
      tender_keyword: {
        type: Sequelize.TEXT
      },
      expire_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('tenders');
  }
};