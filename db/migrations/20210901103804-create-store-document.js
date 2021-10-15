'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('store_documents', {
      file_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      file_name: {
        type: Sequelize.STRING
      },
      file_name_ori: {
        type: Sequelize.STRING
      },
      file_subject: {
        type: Sequelize.STRING
      },
      file_url: {
        type: Sequelize.STRING
      },
      is_show: {
        type: Sequelize.INTEGER
      },
      download: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
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
      is_deleted: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('store_documents');
  }
};