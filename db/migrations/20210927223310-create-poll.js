'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('polls', {
      poll_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      organization_id: {
        type: Sequelize.INTEGER,
      },
      poll_title: {
        type: Sequelize.STRING,
      },
      poll_detail: {
        type: Sequelize.TEXT,
      },
      poll_date_s: {
        type: Sequelize.DATE,
      },
      poll_date_e: {
        type: Sequelize.DATE,
      },
      is_identity: {
        type: Sequelize.INTEGER,
      },
      ip: {
        type: Sequelize.STRING,
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
      is_deleted: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('polls');
  },
};
