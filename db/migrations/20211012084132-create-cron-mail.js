'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cron_mails', {
      contact_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      cron_subject: {
        type: Sequelize.STRING
      },
      cron_detail: {
        type: Sequelize.TEXT
      },
      cron_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      cron_to: {
        type: Sequelize.STRING
      },
      is_send: {
        type: Sequelize.INTEGER
      },
      send_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cron_mails');
  }
};
